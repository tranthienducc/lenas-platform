import PropTypes from "prop-types";
import { createContext, useContext, useReducer } from "react";

const initialEditorState = {
  elements: [
    {
      content: [],
      id: "__body",
      name: "Body",
      styles: {},
      type: "__body",
    },
  ],
  selectedElement: {
    id: "",
    content: [],
    name: "",
    styles: {},
    type: null,
  },
  device: "Desktop",
  previewMode: false,
  liveMode: false,
  funnelPageId: "",
};

const initialHistoryState = {
  history: [initialEditorState],
  currentIndex: 0,
};

const initialState = {
  editor: initialEditorState,
  history: initialHistoryState,
};

const addAnElement = (editorArray, action) => {
  if (action.type !== "ADD_ELEMENT") {
    throw Error(
      "You sent the wrong action type to the Add Element editor state"
    );
  }

  return editorArray?.map((item) => {
    if (
      item?.id === action.payload.containerId &&
      Array.isArray(item.content)
    ) {
      return {
        ...item,
        content: [...item.content, action.payload.elementDetails],
      };
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: addAnElement(item.content, action),
      };
    }

    return item;
  });
};

const updateAnElement = (editorArray, action) => {
  if (action.type !== "UPDATE_ELEMENT") {
    throw Error(
      "You sent the wrong action type to the update Element editor state"
    );
  }

  return editorArray?.map((item) => {
    if (item?.id === action.payload.elementDetails.id) {
      return { ...item, ...action.payload.elementDetails };
    } else if (item.content && Array.isArray(item.content)) {
      return {
        ...item,
        content: updateAnElement(item.content, action),
      };
    }

    return item;
  });
};

const deleteAnElement = (editorArray, action) => {
  if (action.type !== "DELETE_ELEMENT") {
    throw Error(
      "You sent the wrong action type to the delete Element editor state"
    );
  }

  return editorArray.filter((item) => {
    if (item?.id === action.payload.elementDetails.id) {
      return false;
    } else if (item.content && Array.isArray(item.content)) {
      item.content = deleteAnElement(item.content, action);
    }

    return true;
  });
};

const editorReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ELEMENT": {
      const updatedEditorState = {
        ...state.editor,
        elements: addAnElement(state.editor.elements, action),
      };

      const updatedHistory = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorState },
      ];

      const newEditorState = {
        ...state,
        editor: updatedEditorState,
        history: {
          ...state.history,
          history: updatedHistory,
          currentIndex: updatedHistory.length - 1,
        },
      };

      return newEditorState;
    }
    case "UPDATE_ELEMENT": {
      const updatedElements = updateAnElement(state.editor.elements, action);

      const updatedElementIsSelected =
        state.editor.selectedElement.id === action.payload.elementDetails.id;

      const updatedEditorStateWithUpdate = {
        ...state.editor,
        elements: updatedElements,
        selectedElement: updatedElementIsSelected
          ? action.payload.elementDetails
          : {
              id: "",
              content: [],
              name: "",
              styles: {},
              type: null,
            },
      };

      const updatedHistoryWithUpdate = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateWithUpdate },
      ];

      const updatedEditor = {
        ...state,
        editor: updatedEditorStateWithUpdate,
        history: {
          ...state.history,
          history: updatedHistoryWithUpdate,
          currentIndex: updatedHistoryWithUpdate.length - 1,
        },
      };

      return updatedEditor;
    }

    case "DELETE_ELEMENT": {
      const updatedElementsAfterDelete = deleteAnElement(
        state.editor.elements,
        action
      );

      const updatedEditorStateAfterDelete = {
        ...state.editor,
        elements: updatedElementsAfterDelete,
      };

      const updatedHistoryAfterDelete = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateAfterDelete },
      ];

      const deleteState = {
        ...state,
        editor: updatedEditorStateAfterDelete,
        history: {
          ...state.history,
          history: updatedHistoryAfterDelete,
          currentIndex: updatedHistoryAfterDelete.length - 1,
        },
      };
      return deleteState;
    }

    case "CHANGE_CLICKED_ELEMENT": {
      const clickedState = {
        ...state,
        editor: {
          ...state.editor,
          selectedElement: action.payload.elementDetails || {
            id: "",
            content: [],
            name: "",
            styles: {},
            type: null,
          },
        },
        history: {
          ...state.history,
          history: [
            ...state.history.history.slice(0, state.history.currentIndex + 1),
            { ...state.editor },
          ],
          currentIndex: state.history.currentIndex + 1,
        },
      };
      return clickedState;
    }
    case "CHANGE_DEVICE": {
      const changedDeviceState = {
        ...state,
        editor: {
          ...state.editor,
          device: action.payload.device,
        },
      };

      return changedDeviceState;
    }
    case "TOGGLE_PREVIEW_MODE": {
      const toggleState = {
        ...state,
        editor: {
          ...state.editor,
          previewMode: !state.editor.previewMode,
        },
      };
      return toggleState;
    }
    case "TOGGLE_LIVE_MODE": {
      const toggleLiveMode = {
        ...state,
        editor: {
          ...state.editor,
          liveMode: action.payload
            ? action.payload.value
            : !state.editor.liveMode,
        },
      };

      return toggleLiveMode;
    }
    case "REDO": {
      if (state.history.currentIndex < state.history.history.length - 1) {
        const nextIndex = state.history.currentIndex + 1;
        const nextEditorState = { ...state.history.history[nextIndex] };
        const redoState = {
          ...state,
          editor: nextEditorState,
          history: {
            ...state.history,
            currentIndex: nextIndex,
          },
        };
        return redoState;
      }
      return state;
    }
    case "UNDO": {
      if (state.history.currentIndex > 0) {
        const prevIndex = state.history.currentIndex - 1;
        const prevEditorState = { ...state.history.history[prevIndex] };
        const undoState = {
          ...state,
          editor: prevEditorState,
          history: {
            ...state.history,
            currentIndex: prevIndex,
          },
        };
        return undoState;
      }
      return state;
    }

    case "LOAD_DATA": {
      return {
        ...initialState,
        editor: {
          ...initialState.editor,
          elements: action.payload.elements || initialEditorState.elements,
          liveMode: !!action.payload.withLive,
        },
      };
    }
    case "SET_FUNNELPAGE_ID": {
      const { funnelPageId } = action.payload;

      const updatedEditorStateWithFunnelPageId = {
        ...state.editor,
        funnelPageId,
      };

      const updatedHistoryWithFunnelPageId = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateWithFunnelPageId },
      ];

      const funnelPageIdState = {
        ...state,
        editor: updatedEditorStateWithFunnelPageId,
        history: {
          ...state.history,
          history: updatedHistoryWithFunnelPageId,
          currentIndex: updatedHistoryWithFunnelPageId.length - 1,
        },
      };

      return funnelPageIdState;
    }
    default:
      return state;
  }
};

export const EditorContext = createContext({
  state: initialState,
  dispatch: () => undefined,
  subAccountId: "",
  funnelsId: "",
  pageDetails: null,
});

const EditorProvider = ({ children, subAccountId, funnelsId, pageDetails }) => {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  return (
    <EditorContext.Provider
      value={{
        state,
        dispatch,
        subAccountId: subAccountId,
        funnelsId: funnelsId,
        pageDetails: pageDetails,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;

export const useEditor = () => {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error("useEditor Hook must be used within the editor Provider");
  }

  return context;
};

EditorProvider.propTypes = {
  children: PropTypes.node,
  subAccountId: PropTypes.string,
  funnelsId: PropTypes.string,
  pageDetails: PropTypes.any,
};
