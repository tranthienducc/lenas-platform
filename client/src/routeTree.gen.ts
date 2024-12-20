/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PricingImport } from './routes/pricing'
import { Route as LoginImport } from './routes/login'
import { Route as AgencyImport } from './routes/agency'
import { Route as PathImport } from './routes/$path'
import { Route as DomainImport } from './routes/$domain'
import { Route as ChangelogImport } from './routes/$changelog'
import { Route as IndexImport } from './routes/index'
import { Route as SubaccountIdImport } from './routes/subaccount/$id'
import { Route as ProfileIdImport } from './routes/profile/$id'
import { Route as FeaturesDrawImport } from './routes/features/draw'
import { Route as EditProfileIdImport } from './routes/edit-profile/$id'
import { Route as DashboardIdImport } from './routes/dashboard/$id'
import { Route as SubaccountIdSettingImport } from './routes/subaccount/$id/setting'
import { Route as SubaccountIdPipelinesImport } from './routes/subaccount/$id/pipelines'
import { Route as SubaccountIdMediaImport } from './routes/subaccount/$id/media'
import { Route as SubaccountIdLaunchpadImport } from './routes/subaccount/$id/launchpad'
import { Route as SubaccountIdFunnelsImport } from './routes/subaccount/$id/funnels'
import { Route as SubaccountIdDashboardImport } from './routes/subaccount/$id/dashboard'
import { Route as SubaccountIdContactImport } from './routes/subaccount/$id/contact'
import { Route as DashboardIdSettingImport } from './routes/dashboard/$id/setting'
import { Route as DashboardIdLaunchpadImport } from './routes/dashboard/$id/launchpad'
import { Route as DashboardIdDashboardManageImport } from './routes/dashboard/$id/dashboard-manage'
import { Route as DashboardIdChatTeamImport } from './routes/dashboard/$id/chat-team'
import { Route as DashboardIdBillingImport } from './routes/dashboard/$id/billing'
import { Route as DashboardIdAllSubaccountImport } from './routes/dashboard/$id/all-subaccount'
import { Route as DashboardIdAiImport } from './routes/dashboard/$id/ai'
import { Route as SubaccountIdPipelinePipelineIdImport } from './routes/subaccount/$id/pipeline/$pipelineId'
import { Route as SubaccountIdFunnelFunnelIdImport } from './routes/subaccount/$id/funnel/$funnelId'
import { Route as SubaccountIdFunnelFunnelsIdEditorFunnelPageIdImport } from './routes/subaccount/$id/funnel/$funnelsId/editor/$funnelPageId'

// Create/Update Routes

const PricingRoute = PricingImport.update({
  path: '/pricing',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AgencyRoute = AgencyImport.update({
  path: '/agency',
  getParentRoute: () => rootRoute,
} as any)

const PathRoute = PathImport.update({
  path: '/$path',
  getParentRoute: () => rootRoute,
} as any)

const DomainRoute = DomainImport.update({
  path: '/$domain',
  getParentRoute: () => rootRoute,
} as any)

const ChangelogRoute = ChangelogImport.update({
  path: '/$changelog',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const SubaccountIdRoute = SubaccountIdImport.update({
  path: '/subaccount/$id',
  getParentRoute: () => rootRoute,
} as any)

const ProfileIdRoute = ProfileIdImport.update({
  path: '/profile/$id',
  getParentRoute: () => rootRoute,
} as any)

const FeaturesDrawRoute = FeaturesDrawImport.update({
  path: '/features/draw',
  getParentRoute: () => rootRoute,
} as any)

const EditProfileIdRoute = EditProfileIdImport.update({
  path: '/edit-profile/$id',
  getParentRoute: () => rootRoute,
} as any)

const DashboardIdRoute = DashboardIdImport.update({
  path: '/dashboard/$id',
  getParentRoute: () => rootRoute,
} as any)

const SubaccountIdSettingRoute = SubaccountIdSettingImport.update({
  path: '/setting',
  getParentRoute: () => SubaccountIdRoute,
} as any)

const SubaccountIdPipelinesRoute = SubaccountIdPipelinesImport.update({
  path: '/pipelines',
  getParentRoute: () => SubaccountIdRoute,
} as any)

const SubaccountIdMediaRoute = SubaccountIdMediaImport.update({
  path: '/media',
  getParentRoute: () => SubaccountIdRoute,
} as any)

const SubaccountIdLaunchpadRoute = SubaccountIdLaunchpadImport.update({
  path: '/launchpad',
  getParentRoute: () => SubaccountIdRoute,
} as any)

const SubaccountIdFunnelsRoute = SubaccountIdFunnelsImport.update({
  path: '/funnels',
  getParentRoute: () => SubaccountIdRoute,
} as any)

const SubaccountIdDashboardRoute = SubaccountIdDashboardImport.update({
  path: '/dashboard',
  getParentRoute: () => SubaccountIdRoute,
} as any)

const SubaccountIdContactRoute = SubaccountIdContactImport.update({
  path: '/contact',
  getParentRoute: () => SubaccountIdRoute,
} as any)

const DashboardIdSettingRoute = DashboardIdSettingImport.update({
  path: '/setting',
  getParentRoute: () => DashboardIdRoute,
} as any)

const DashboardIdLaunchpadRoute = DashboardIdLaunchpadImport.update({
  path: '/launchpad',
  getParentRoute: () => DashboardIdRoute,
} as any)

const DashboardIdDashboardManageRoute = DashboardIdDashboardManageImport.update(
  {
    path: '/dashboard-manage',
    getParentRoute: () => DashboardIdRoute,
  } as any,
)

const DashboardIdChatTeamRoute = DashboardIdChatTeamImport.update({
  path: '/chat-team',
  getParentRoute: () => DashboardIdRoute,
} as any)

const DashboardIdBillingRoute = DashboardIdBillingImport.update({
  path: '/billing',
  getParentRoute: () => DashboardIdRoute,
} as any)

const DashboardIdAllSubaccountRoute = DashboardIdAllSubaccountImport.update({
  path: '/all-subaccount',
  getParentRoute: () => DashboardIdRoute,
} as any)

const DashboardIdAiRoute = DashboardIdAiImport.update({
  path: '/ai',
  getParentRoute: () => DashboardIdRoute,
} as any)

const SubaccountIdPipelinePipelineIdRoute =
  SubaccountIdPipelinePipelineIdImport.update({
    path: '/pipeline/$pipelineId',
    getParentRoute: () => SubaccountIdRoute,
  } as any)

const SubaccountIdFunnelFunnelIdRoute = SubaccountIdFunnelFunnelIdImport.update(
  {
    path: '/funnel/$funnelId',
    getParentRoute: () => SubaccountIdRoute,
  } as any,
)

const SubaccountIdFunnelFunnelsIdEditorFunnelPageIdRoute =
  SubaccountIdFunnelFunnelsIdEditorFunnelPageIdImport.update({
    path: '/funnel/$funnelsId/editor/$funnelPageId',
    getParentRoute: () => SubaccountIdRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/$changelog': {
      id: '/$changelog'
      path: '/$changelog'
      fullPath: '/$changelog'
      preLoaderRoute: typeof ChangelogImport
      parentRoute: typeof rootRoute
    }
    '/$domain': {
      id: '/$domain'
      path: '/$domain'
      fullPath: '/$domain'
      preLoaderRoute: typeof DomainImport
      parentRoute: typeof rootRoute
    }
    '/$path': {
      id: '/$path'
      path: '/$path'
      fullPath: '/$path'
      preLoaderRoute: typeof PathImport
      parentRoute: typeof rootRoute
    }
    '/agency': {
      id: '/agency'
      path: '/agency'
      fullPath: '/agency'
      preLoaderRoute: typeof AgencyImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/pricing': {
      id: '/pricing'
      path: '/pricing'
      fullPath: '/pricing'
      preLoaderRoute: typeof PricingImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/$id': {
      id: '/dashboard/$id'
      path: '/dashboard/$id'
      fullPath: '/dashboard/$id'
      preLoaderRoute: typeof DashboardIdImport
      parentRoute: typeof rootRoute
    }
    '/edit-profile/$id': {
      id: '/edit-profile/$id'
      path: '/edit-profile/$id'
      fullPath: '/edit-profile/$id'
      preLoaderRoute: typeof EditProfileIdImport
      parentRoute: typeof rootRoute
    }
    '/features/draw': {
      id: '/features/draw'
      path: '/features/draw'
      fullPath: '/features/draw'
      preLoaderRoute: typeof FeaturesDrawImport
      parentRoute: typeof rootRoute
    }
    '/profile/$id': {
      id: '/profile/$id'
      path: '/profile/$id'
      fullPath: '/profile/$id'
      preLoaderRoute: typeof ProfileIdImport
      parentRoute: typeof rootRoute
    }
    '/subaccount/$id': {
      id: '/subaccount/$id'
      path: '/subaccount/$id'
      fullPath: '/subaccount/$id'
      preLoaderRoute: typeof SubaccountIdImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/$id/ai': {
      id: '/dashboard/$id/ai'
      path: '/ai'
      fullPath: '/dashboard/$id/ai'
      preLoaderRoute: typeof DashboardIdAiImport
      parentRoute: typeof DashboardIdImport
    }
    '/dashboard/$id/all-subaccount': {
      id: '/dashboard/$id/all-subaccount'
      path: '/all-subaccount'
      fullPath: '/dashboard/$id/all-subaccount'
      preLoaderRoute: typeof DashboardIdAllSubaccountImport
      parentRoute: typeof DashboardIdImport
    }
    '/dashboard/$id/billing': {
      id: '/dashboard/$id/billing'
      path: '/billing'
      fullPath: '/dashboard/$id/billing'
      preLoaderRoute: typeof DashboardIdBillingImport
      parentRoute: typeof DashboardIdImport
    }
    '/dashboard/$id/chat-team': {
      id: '/dashboard/$id/chat-team'
      path: '/chat-team'
      fullPath: '/dashboard/$id/chat-team'
      preLoaderRoute: typeof DashboardIdChatTeamImport
      parentRoute: typeof DashboardIdImport
    }
    '/dashboard/$id/dashboard-manage': {
      id: '/dashboard/$id/dashboard-manage'
      path: '/dashboard-manage'
      fullPath: '/dashboard/$id/dashboard-manage'
      preLoaderRoute: typeof DashboardIdDashboardManageImport
      parentRoute: typeof DashboardIdImport
    }
    '/dashboard/$id/launchpad': {
      id: '/dashboard/$id/launchpad'
      path: '/launchpad'
      fullPath: '/dashboard/$id/launchpad'
      preLoaderRoute: typeof DashboardIdLaunchpadImport
      parentRoute: typeof DashboardIdImport
    }
    '/dashboard/$id/setting': {
      id: '/dashboard/$id/setting'
      path: '/setting'
      fullPath: '/dashboard/$id/setting'
      preLoaderRoute: typeof DashboardIdSettingImport
      parentRoute: typeof DashboardIdImport
    }
    '/subaccount/$id/contact': {
      id: '/subaccount/$id/contact'
      path: '/contact'
      fullPath: '/subaccount/$id/contact'
      preLoaderRoute: typeof SubaccountIdContactImport
      parentRoute: typeof SubaccountIdImport
    }
    '/subaccount/$id/dashboard': {
      id: '/subaccount/$id/dashboard'
      path: '/dashboard'
      fullPath: '/subaccount/$id/dashboard'
      preLoaderRoute: typeof SubaccountIdDashboardImport
      parentRoute: typeof SubaccountIdImport
    }
    '/subaccount/$id/funnels': {
      id: '/subaccount/$id/funnels'
      path: '/funnels'
      fullPath: '/subaccount/$id/funnels'
      preLoaderRoute: typeof SubaccountIdFunnelsImport
      parentRoute: typeof SubaccountIdImport
    }
    '/subaccount/$id/launchpad': {
      id: '/subaccount/$id/launchpad'
      path: '/launchpad'
      fullPath: '/subaccount/$id/launchpad'
      preLoaderRoute: typeof SubaccountIdLaunchpadImport
      parentRoute: typeof SubaccountIdImport
    }
    '/subaccount/$id/media': {
      id: '/subaccount/$id/media'
      path: '/media'
      fullPath: '/subaccount/$id/media'
      preLoaderRoute: typeof SubaccountIdMediaImport
      parentRoute: typeof SubaccountIdImport
    }
    '/subaccount/$id/pipelines': {
      id: '/subaccount/$id/pipelines'
      path: '/pipelines'
      fullPath: '/subaccount/$id/pipelines'
      preLoaderRoute: typeof SubaccountIdPipelinesImport
      parentRoute: typeof SubaccountIdImport
    }
    '/subaccount/$id/setting': {
      id: '/subaccount/$id/setting'
      path: '/setting'
      fullPath: '/subaccount/$id/setting'
      preLoaderRoute: typeof SubaccountIdSettingImport
      parentRoute: typeof SubaccountIdImport
    }
    '/subaccount/$id/funnel/$funnelId': {
      id: '/subaccount/$id/funnel/$funnelId'
      path: '/funnel/$funnelId'
      fullPath: '/subaccount/$id/funnel/$funnelId'
      preLoaderRoute: typeof SubaccountIdFunnelFunnelIdImport
      parentRoute: typeof SubaccountIdImport
    }
    '/subaccount/$id/pipeline/$pipelineId': {
      id: '/subaccount/$id/pipeline/$pipelineId'
      path: '/pipeline/$pipelineId'
      fullPath: '/subaccount/$id/pipeline/$pipelineId'
      preLoaderRoute: typeof SubaccountIdPipelinePipelineIdImport
      parentRoute: typeof SubaccountIdImport
    }
    '/subaccount/$id/funnel/$funnelsId/editor/$funnelPageId': {
      id: '/subaccount/$id/funnel/$funnelsId/editor/$funnelPageId'
      path: '/funnel/$funnelsId/editor/$funnelPageId'
      fullPath: '/subaccount/$id/funnel/$funnelsId/editor/$funnelPageId'
      preLoaderRoute: typeof SubaccountIdFunnelFunnelsIdEditorFunnelPageIdImport
      parentRoute: typeof SubaccountIdImport
    }
  }
}

// Create and export the route tree

interface DashboardIdRouteChildren {
  DashboardIdAiRoute: typeof DashboardIdAiRoute
  DashboardIdAllSubaccountRoute: typeof DashboardIdAllSubaccountRoute
  DashboardIdBillingRoute: typeof DashboardIdBillingRoute
  DashboardIdChatTeamRoute: typeof DashboardIdChatTeamRoute
  DashboardIdDashboardManageRoute: typeof DashboardIdDashboardManageRoute
  DashboardIdLaunchpadRoute: typeof DashboardIdLaunchpadRoute
  DashboardIdSettingRoute: typeof DashboardIdSettingRoute
}

const DashboardIdRouteChildren: DashboardIdRouteChildren = {
  DashboardIdAiRoute: DashboardIdAiRoute,
  DashboardIdAllSubaccountRoute: DashboardIdAllSubaccountRoute,
  DashboardIdBillingRoute: DashboardIdBillingRoute,
  DashboardIdChatTeamRoute: DashboardIdChatTeamRoute,
  DashboardIdDashboardManageRoute: DashboardIdDashboardManageRoute,
  DashboardIdLaunchpadRoute: DashboardIdLaunchpadRoute,
  DashboardIdSettingRoute: DashboardIdSettingRoute,
}

const DashboardIdRouteWithChildren = DashboardIdRoute._addFileChildren(
  DashboardIdRouteChildren,
)

interface SubaccountIdRouteChildren {
  SubaccountIdContactRoute: typeof SubaccountIdContactRoute
  SubaccountIdDashboardRoute: typeof SubaccountIdDashboardRoute
  SubaccountIdFunnelsRoute: typeof SubaccountIdFunnelsRoute
  SubaccountIdLaunchpadRoute: typeof SubaccountIdLaunchpadRoute
  SubaccountIdMediaRoute: typeof SubaccountIdMediaRoute
  SubaccountIdPipelinesRoute: typeof SubaccountIdPipelinesRoute
  SubaccountIdSettingRoute: typeof SubaccountIdSettingRoute
  SubaccountIdFunnelFunnelIdRoute: typeof SubaccountIdFunnelFunnelIdRoute
  SubaccountIdPipelinePipelineIdRoute: typeof SubaccountIdPipelinePipelineIdRoute
  SubaccountIdFunnelFunnelsIdEditorFunnelPageIdRoute: typeof SubaccountIdFunnelFunnelsIdEditorFunnelPageIdRoute
}

const SubaccountIdRouteChildren: SubaccountIdRouteChildren = {
  SubaccountIdContactRoute: SubaccountIdContactRoute,
  SubaccountIdDashboardRoute: SubaccountIdDashboardRoute,
  SubaccountIdFunnelsRoute: SubaccountIdFunnelsRoute,
  SubaccountIdLaunchpadRoute: SubaccountIdLaunchpadRoute,
  SubaccountIdMediaRoute: SubaccountIdMediaRoute,
  SubaccountIdPipelinesRoute: SubaccountIdPipelinesRoute,
  SubaccountIdSettingRoute: SubaccountIdSettingRoute,
  SubaccountIdFunnelFunnelIdRoute: SubaccountIdFunnelFunnelIdRoute,
  SubaccountIdPipelinePipelineIdRoute: SubaccountIdPipelinePipelineIdRoute,
  SubaccountIdFunnelFunnelsIdEditorFunnelPageIdRoute:
    SubaccountIdFunnelFunnelsIdEditorFunnelPageIdRoute,
}

const SubaccountIdRouteWithChildren = SubaccountIdRoute._addFileChildren(
  SubaccountIdRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/$changelog': typeof ChangelogRoute
  '/$domain': typeof DomainRoute
  '/$path': typeof PathRoute
  '/agency': typeof AgencyRoute
  '/login': typeof LoginRoute
  '/pricing': typeof PricingRoute
  '/dashboard/$id': typeof DashboardIdRouteWithChildren
  '/edit-profile/$id': typeof EditProfileIdRoute
  '/features/draw': typeof FeaturesDrawRoute
  '/profile/$id': typeof ProfileIdRoute
  '/subaccount/$id': typeof SubaccountIdRouteWithChildren
  '/dashboard/$id/ai': typeof DashboardIdAiRoute
  '/dashboard/$id/all-subaccount': typeof DashboardIdAllSubaccountRoute
  '/dashboard/$id/billing': typeof DashboardIdBillingRoute
  '/dashboard/$id/chat-team': typeof DashboardIdChatTeamRoute
  '/dashboard/$id/dashboard-manage': typeof DashboardIdDashboardManageRoute
  '/dashboard/$id/launchpad': typeof DashboardIdLaunchpadRoute
  '/dashboard/$id/setting': typeof DashboardIdSettingRoute
  '/subaccount/$id/contact': typeof SubaccountIdContactRoute
  '/subaccount/$id/dashboard': typeof SubaccountIdDashboardRoute
  '/subaccount/$id/funnels': typeof SubaccountIdFunnelsRoute
  '/subaccount/$id/launchpad': typeof SubaccountIdLaunchpadRoute
  '/subaccount/$id/media': typeof SubaccountIdMediaRoute
  '/subaccount/$id/pipelines': typeof SubaccountIdPipelinesRoute
  '/subaccount/$id/setting': typeof SubaccountIdSettingRoute
  '/subaccount/$id/funnel/$funnelId': typeof SubaccountIdFunnelFunnelIdRoute
  '/subaccount/$id/pipeline/$pipelineId': typeof SubaccountIdPipelinePipelineIdRoute
  '/subaccount/$id/funnel/$funnelsId/editor/$funnelPageId': typeof SubaccountIdFunnelFunnelsIdEditorFunnelPageIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/$changelog': typeof ChangelogRoute
  '/$domain': typeof DomainRoute
  '/$path': typeof PathRoute
  '/agency': typeof AgencyRoute
  '/login': typeof LoginRoute
  '/pricing': typeof PricingRoute
  '/dashboard/$id': typeof DashboardIdRouteWithChildren
  '/edit-profile/$id': typeof EditProfileIdRoute
  '/features/draw': typeof FeaturesDrawRoute
  '/profile/$id': typeof ProfileIdRoute
  '/subaccount/$id': typeof SubaccountIdRouteWithChildren
  '/dashboard/$id/ai': typeof DashboardIdAiRoute
  '/dashboard/$id/all-subaccount': typeof DashboardIdAllSubaccountRoute
  '/dashboard/$id/billing': typeof DashboardIdBillingRoute
  '/dashboard/$id/chat-team': typeof DashboardIdChatTeamRoute
  '/dashboard/$id/dashboard-manage': typeof DashboardIdDashboardManageRoute
  '/dashboard/$id/launchpad': typeof DashboardIdLaunchpadRoute
  '/dashboard/$id/setting': typeof DashboardIdSettingRoute
  '/subaccount/$id/contact': typeof SubaccountIdContactRoute
  '/subaccount/$id/dashboard': typeof SubaccountIdDashboardRoute
  '/subaccount/$id/funnels': typeof SubaccountIdFunnelsRoute
  '/subaccount/$id/launchpad': typeof SubaccountIdLaunchpadRoute
  '/subaccount/$id/media': typeof SubaccountIdMediaRoute
  '/subaccount/$id/pipelines': typeof SubaccountIdPipelinesRoute
  '/subaccount/$id/setting': typeof SubaccountIdSettingRoute
  '/subaccount/$id/funnel/$funnelId': typeof SubaccountIdFunnelFunnelIdRoute
  '/subaccount/$id/pipeline/$pipelineId': typeof SubaccountIdPipelinePipelineIdRoute
  '/subaccount/$id/funnel/$funnelsId/editor/$funnelPageId': typeof SubaccountIdFunnelFunnelsIdEditorFunnelPageIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/$changelog': typeof ChangelogRoute
  '/$domain': typeof DomainRoute
  '/$path': typeof PathRoute
  '/agency': typeof AgencyRoute
  '/login': typeof LoginRoute
  '/pricing': typeof PricingRoute
  '/dashboard/$id': typeof DashboardIdRouteWithChildren
  '/edit-profile/$id': typeof EditProfileIdRoute
  '/features/draw': typeof FeaturesDrawRoute
  '/profile/$id': typeof ProfileIdRoute
  '/subaccount/$id': typeof SubaccountIdRouteWithChildren
  '/dashboard/$id/ai': typeof DashboardIdAiRoute
  '/dashboard/$id/all-subaccount': typeof DashboardIdAllSubaccountRoute
  '/dashboard/$id/billing': typeof DashboardIdBillingRoute
  '/dashboard/$id/chat-team': typeof DashboardIdChatTeamRoute
  '/dashboard/$id/dashboard-manage': typeof DashboardIdDashboardManageRoute
  '/dashboard/$id/launchpad': typeof DashboardIdLaunchpadRoute
  '/dashboard/$id/setting': typeof DashboardIdSettingRoute
  '/subaccount/$id/contact': typeof SubaccountIdContactRoute
  '/subaccount/$id/dashboard': typeof SubaccountIdDashboardRoute
  '/subaccount/$id/funnels': typeof SubaccountIdFunnelsRoute
  '/subaccount/$id/launchpad': typeof SubaccountIdLaunchpadRoute
  '/subaccount/$id/media': typeof SubaccountIdMediaRoute
  '/subaccount/$id/pipelines': typeof SubaccountIdPipelinesRoute
  '/subaccount/$id/setting': typeof SubaccountIdSettingRoute
  '/subaccount/$id/funnel/$funnelId': typeof SubaccountIdFunnelFunnelIdRoute
  '/subaccount/$id/pipeline/$pipelineId': typeof SubaccountIdPipelinePipelineIdRoute
  '/subaccount/$id/funnel/$funnelsId/editor/$funnelPageId': typeof SubaccountIdFunnelFunnelsIdEditorFunnelPageIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/$changelog'
    | '/$domain'
    | '/$path'
    | '/agency'
    | '/login'
    | '/pricing'
    | '/dashboard/$id'
    | '/edit-profile/$id'
    | '/features/draw'
    | '/profile/$id'
    | '/subaccount/$id'
    | '/dashboard/$id/ai'
    | '/dashboard/$id/all-subaccount'
    | '/dashboard/$id/billing'
    | '/dashboard/$id/chat-team'
    | '/dashboard/$id/dashboard-manage'
    | '/dashboard/$id/launchpad'
    | '/dashboard/$id/setting'
    | '/subaccount/$id/contact'
    | '/subaccount/$id/dashboard'
    | '/subaccount/$id/funnels'
    | '/subaccount/$id/launchpad'
    | '/subaccount/$id/media'
    | '/subaccount/$id/pipelines'
    | '/subaccount/$id/setting'
    | '/subaccount/$id/funnel/$funnelId'
    | '/subaccount/$id/pipeline/$pipelineId'
    | '/subaccount/$id/funnel/$funnelsId/editor/$funnelPageId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/$changelog'
    | '/$domain'
    | '/$path'
    | '/agency'
    | '/login'
    | '/pricing'
    | '/dashboard/$id'
    | '/edit-profile/$id'
    | '/features/draw'
    | '/profile/$id'
    | '/subaccount/$id'
    | '/dashboard/$id/ai'
    | '/dashboard/$id/all-subaccount'
    | '/dashboard/$id/billing'
    | '/dashboard/$id/chat-team'
    | '/dashboard/$id/dashboard-manage'
    | '/dashboard/$id/launchpad'
    | '/dashboard/$id/setting'
    | '/subaccount/$id/contact'
    | '/subaccount/$id/dashboard'
    | '/subaccount/$id/funnels'
    | '/subaccount/$id/launchpad'
    | '/subaccount/$id/media'
    | '/subaccount/$id/pipelines'
    | '/subaccount/$id/setting'
    | '/subaccount/$id/funnel/$funnelId'
    | '/subaccount/$id/pipeline/$pipelineId'
    | '/subaccount/$id/funnel/$funnelsId/editor/$funnelPageId'
  id:
    | '__root__'
    | '/'
    | '/$changelog'
    | '/$domain'
    | '/$path'
    | '/agency'
    | '/login'
    | '/pricing'
    | '/dashboard/$id'
    | '/edit-profile/$id'
    | '/features/draw'
    | '/profile/$id'
    | '/subaccount/$id'
    | '/dashboard/$id/ai'
    | '/dashboard/$id/all-subaccount'
    | '/dashboard/$id/billing'
    | '/dashboard/$id/chat-team'
    | '/dashboard/$id/dashboard-manage'
    | '/dashboard/$id/launchpad'
    | '/dashboard/$id/setting'
    | '/subaccount/$id/contact'
    | '/subaccount/$id/dashboard'
    | '/subaccount/$id/funnels'
    | '/subaccount/$id/launchpad'
    | '/subaccount/$id/media'
    | '/subaccount/$id/pipelines'
    | '/subaccount/$id/setting'
    | '/subaccount/$id/funnel/$funnelId'
    | '/subaccount/$id/pipeline/$pipelineId'
    | '/subaccount/$id/funnel/$funnelsId/editor/$funnelPageId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ChangelogRoute: typeof ChangelogRoute
  DomainRoute: typeof DomainRoute
  PathRoute: typeof PathRoute
  AgencyRoute: typeof AgencyRoute
  LoginRoute: typeof LoginRoute
  PricingRoute: typeof PricingRoute
  DashboardIdRoute: typeof DashboardIdRouteWithChildren
  EditProfileIdRoute: typeof EditProfileIdRoute
  FeaturesDrawRoute: typeof FeaturesDrawRoute
  ProfileIdRoute: typeof ProfileIdRoute
  SubaccountIdRoute: typeof SubaccountIdRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ChangelogRoute: ChangelogRoute,
  DomainRoute: DomainRoute,
  PathRoute: PathRoute,
  AgencyRoute: AgencyRoute,
  LoginRoute: LoginRoute,
  PricingRoute: PricingRoute,
  DashboardIdRoute: DashboardIdRouteWithChildren,
  EditProfileIdRoute: EditProfileIdRoute,
  FeaturesDrawRoute: FeaturesDrawRoute,
  ProfileIdRoute: ProfileIdRoute,
  SubaccountIdRoute: SubaccountIdRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.jsx",
      "children": [
        "/",
        "/$changelog",
        "/$domain",
        "/$path",
        "/agency",
        "/login",
        "/pricing",
        "/dashboard/$id",
        "/edit-profile/$id",
        "/features/draw",
        "/profile/$id",
        "/subaccount/$id"
      ]
    },
    "/": {
      "filePath": "index.jsx"
    },
    "/$changelog": {
      "filePath": "$changelog.jsx"
    },
    "/$domain": {
      "filePath": "$domain.jsx"
    },
    "/$path": {
      "filePath": "$path.jsx"
    },
    "/agency": {
      "filePath": "agency.jsx"
    },
    "/login": {
      "filePath": "login.jsx"
    },
    "/pricing": {
      "filePath": "pricing.jsx"
    },
    "/dashboard/$id": {
      "filePath": "dashboard/$id.jsx",
      "children": [
        "/dashboard/$id/ai",
        "/dashboard/$id/all-subaccount",
        "/dashboard/$id/billing",
        "/dashboard/$id/chat-team",
        "/dashboard/$id/dashboard-manage",
        "/dashboard/$id/launchpad",
        "/dashboard/$id/setting"
      ]
    },
    "/edit-profile/$id": {
      "filePath": "edit-profile/$id.jsx"
    },
    "/features/draw": {
      "filePath": "features/draw.jsx"
    },
    "/profile/$id": {
      "filePath": "profile/$id.jsx"
    },
    "/subaccount/$id": {
      "filePath": "subaccount/$id.jsx",
      "children": [
        "/subaccount/$id/contact",
        "/subaccount/$id/dashboard",
        "/subaccount/$id/funnels",
        "/subaccount/$id/launchpad",
        "/subaccount/$id/media",
        "/subaccount/$id/pipelines",
        "/subaccount/$id/setting",
        "/subaccount/$id/funnel/$funnelId",
        "/subaccount/$id/pipeline/$pipelineId",
        "/subaccount/$id/funnel/$funnelsId/editor/$funnelPageId"
      ]
    },
    "/dashboard/$id/ai": {
      "filePath": "dashboard/$id/ai.jsx",
      "parent": "/dashboard/$id"
    },
    "/dashboard/$id/all-subaccount": {
      "filePath": "dashboard/$id/all-subaccount.jsx",
      "parent": "/dashboard/$id"
    },
    "/dashboard/$id/billing": {
      "filePath": "dashboard/$id/billing.jsx",
      "parent": "/dashboard/$id"
    },
    "/dashboard/$id/chat-team": {
      "filePath": "dashboard/$id/chat-team.jsx",
      "parent": "/dashboard/$id"
    },
    "/dashboard/$id/dashboard-manage": {
      "filePath": "dashboard/$id/dashboard-manage.jsx",
      "parent": "/dashboard/$id"
    },
    "/dashboard/$id/launchpad": {
      "filePath": "dashboard/$id/launchpad.jsx",
      "parent": "/dashboard/$id"
    },
    "/dashboard/$id/setting": {
      "filePath": "dashboard/$id/setting.jsx",
      "parent": "/dashboard/$id"
    },
    "/subaccount/$id/contact": {
      "filePath": "subaccount/$id/contact.jsx",
      "parent": "/subaccount/$id"
    },
    "/subaccount/$id/dashboard": {
      "filePath": "subaccount/$id/dashboard.jsx",
      "parent": "/subaccount/$id"
    },
    "/subaccount/$id/funnels": {
      "filePath": "subaccount/$id/funnels.jsx",
      "parent": "/subaccount/$id"
    },
    "/subaccount/$id/launchpad": {
      "filePath": "subaccount/$id/launchpad.jsx",
      "parent": "/subaccount/$id"
    },
    "/subaccount/$id/media": {
      "filePath": "subaccount/$id/media.jsx",
      "parent": "/subaccount/$id"
    },
    "/subaccount/$id/pipelines": {
      "filePath": "subaccount/$id/pipelines.jsx",
      "parent": "/subaccount/$id"
    },
    "/subaccount/$id/setting": {
      "filePath": "subaccount/$id/setting.jsx",
      "parent": "/subaccount/$id"
    },
    "/subaccount/$id/funnel/$funnelId": {
      "filePath": "subaccount/$id/funnel/$funnelId.jsx",
      "parent": "/subaccount/$id"
    },
    "/subaccount/$id/pipeline/$pipelineId": {
      "filePath": "subaccount/$id/pipeline/$pipelineId.jsx",
      "parent": "/subaccount/$id"
    },
    "/subaccount/$id/funnel/$funnelsId/editor/$funnelPageId": {
      "filePath": "subaccount/$id/funnel/$funnelsId/editor/$funnelPageId.jsx",
      "parent": "/subaccount/$id"
    }
  }
}
ROUTE_MANIFEST_END */
