import IconsLoading from "@/components/icons/IconsLoading";
import { Badge } from "@/components/ui/badge";
import { getFunnel } from "@/lib/actions/funnels/get-funnel";
import { getSubaccountDetails } from "@/lib/actions/subaccount/get-subaccount-detail";
import { getStripe } from "@/lib/stripe/stripe-client";
import { useEditor } from "@/providers/editor/editor-provider";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useRouter } from "@tanstack/react-router";
import clsx from "clsx";
import { Trash } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const PaymentComponent = ({ element }) => {
  const { dispatch, state, subAccountId, funnelId, pageDetails } = useEditor();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState("");
  const [livePrices, setLivePrices] = useState([]);
  const [subConnectAccountId, setSubConnectAccountId] = useState("");
  const styles = element.styles;

  useEffect(() => {
    if (!subAccountId) return;
    const fetchData = async () => {
      if (subAccountId) {
        const subAccoutnDetails = await getSubaccountDetails({ subAccountId });
        if (subAccoutnDetails) {
          if (!subAccoutnDetails.connectAccountId) return;
          setSubConnectAccountId(subAccoutnDetails?.connectAccountId);
        }
      }

      if (funnelId) {
        const funnel = await getFunnel(funnelId);
        setLivePrices(JSON.parse(funnel?.liveProducts || "[]"));
      }
    };
    fetchData();
  }, [subAccountId, funnelId]);

  useEffect(() => {
    if (livePrices.length && subAccountId && subConnectAccountId) {
      const getClientSercet = async () => {
        try {
          const body = JSON.stringify({
            subConnectAccountId,
            prices: livePrices,
            subAccountId,
          });

          const response = await fetch(`/api/stripe/create-checkout-session`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body,
          });

          const data = await response.json();
          if (!data) throw new Error("Some thing went wrong");
          if (data.error) {
            throw new Error(data.error);
          }

          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          }
        } catch (error) {
          toast("Failed to create checkout", {
            className: "z-[100000]",
            description: error.message,
          });
        }
      };
      getClientSercet();
    }
  }, [livePrices, subAccountId, subConnectAccountId]);

  const handleDragStart = (e, type) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };

  const handleOnClickBody = (e) => {
    e.stopPropagation();

    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  const goToNextPage = async () => {
    if (!state.editor.liveMode) return;
    const funnelsPage = await getFunnel(funnelId);
    if (!funnelsPage || !pageDetails) return;
    if (funnelsPage.FunnelPages.length > pageDetails.order + 1) {
      const nextPage = funnelsPage.FunnelPages.find(
        (page) => page.order === pageDetails.order + 1
      );

      if (!nextPage) return;
      router.navigate({
        to: `${import.meta.env.VITE_SCHEME}${funnelsPage.subDomainName}.${import.meta.env.VITE_PUBLIC_DOMAIN}/${nextPage.pathName}`,
        replace: true,
      });
    }
  };

  const options = useMemo(
    () => ({
      clientSecret,
      onComplete: () => {
        goToNextPage();
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [clientSecret]
  );

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: { elementDetails: element },
    });
  };

  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, "contactForm")}
      onClick={handleOnClickBody}
      className={clsx(
        "p-[2px] w-full m-[5px] relative text-[16px] transition-all flex items-center justify-center",
        {
          "!border-blue-500": state.editor.selectedElement.id === element.id,

          "!border-solid": state.editor.selectedElement.id === element.id,
          "border-dashed border-[1px] border-slate-300": !state.editor.liveMode,
        }
      )}
    >
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg bg-black text-white">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      <div className="w-full transition-all border-none">
        <div className="flex flex-col w-full gap-4">
          {options.clientSecret && subConnectAccountId && (
            <div className="text-white">
              <EmbeddedCheckoutProvider
                stripe={getStripe(subConnectAccountId)}
                options={options}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          )}

          {!options.clientSecret && (
            <div className="flex items-center justify-center w-full h-40">
              <IconsLoading />
            </div>
          )}
        </div>
      </div>

      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-black px-2.5 py-1 text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </div>
  );
};

export default PaymentComponent;

PaymentComponent.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
          type: PropTypes.string,
        })
      ),
      PropTypes.shape({
        href: PropTypes.string,
        innerText: PropTypes.string,
        src: PropTypes.string,
      }),
    ]),
    name: PropTypes.string,
    styles: PropTypes.object,
    type: PropTypes.string,
  }),
};
