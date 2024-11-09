import { addOnsProduct } from "@/constants";
import { getAgencyById } from "@/lib/actions/agency/get-agency-by-id";
import { getAgencyBySub } from "@/lib/actions/agency/get-agency-by-sub";
import { getAgencyByUser } from "@/lib/actions/agency/get-agency-by-user";
import { getAgencySubscription } from "@/lib/actions/agency/get-agency-subscription";
import { getAllAgency } from "@/lib/actions/agency/get-all-agency";
import { getSubscriptionByAgency } from "@/lib/actions/agency/get-subscription-by-agency";
import { getDomainContent } from "@/lib/actions/funnels/get-domain-content";
import { getFunnel } from "@/lib/actions/funnels/get-funnel";
import { getFunnelPage } from "@/lib/actions/funnels/get-funnel-page-details";
import { getFunnels } from "@/lib/actions/funnels/get-funnels";
import { getLandTicketAndTags } from "@/lib/actions/lane/get-land-ticket-and-tag";
import { getMedia } from "@/lib/actions/media/get-media";
import { getNotificationAndUser } from "@/lib/actions/notifications/get-notification-and-user";
import { getAllPipelines } from "@/lib/actions/pipelines/get-all-pipelines";
import { getPipelinesDetails } from "@/lib/actions/pipelines/get-pipelines-details";
import { getPipelinesFirst } from "@/lib/actions/pipelines/get-pipelines-first";
import { getCollectSubAccount } from "@/lib/actions/subaccount/get-collect-sub-account";
import { getSubaccountDetails } from "@/lib/actions/subaccount/get-subaccount-detail";
import { getSubAccountWithContact } from "@/lib/actions/subaccount/get-subaccount-with-contact";
import { getTeamMembersByAgency } from "@/lib/actions/team/get-team-members-by-agency";
import { verifyUserAndAcceptInvitation } from "@/lib/actions/team/verify-user-accept-invitation";
import getAllProfile from "@/lib/actions/user/get-all-profile";
import { getAuthUserDetail } from "@/lib/actions/user/get-auth-user-detail";
import { getCurrentUser } from "@/lib/actions/user/get-current-user";
import { stripe } from "@/lib/stripe";
import { getConnectAccountProducts } from "@/lib/stripe/stripe-action";
import { QUERY_KEYS } from "@/lib/tanstack-query/QueryKeys";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUser = () => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: async () => {
      const currentUser = await getCurrentUser();
      return currentUser;
    },
  });

  return data;
};
export const useVerifyUserAcceptIn = () => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.VERIFY_USER_ACCEPT_INVITATION],
    queryFn: async () => {
      const agencyId = await verifyUserAndAcceptInvitation();

      return agencyId;
    },
  });

  return data;
};

export const useGetAddOnsFromStripe = () => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_ADD_ONS_FROM_STRIPE],
    queryFn: async () => {
      const addOns = await stripe.products.list({
        ids: addOnsProduct.map((product) => product.id),
        expand: ["data.default_price"],
      });

      return addOns;
    },
  });

  return data;
};

export const useGetAgencySubscription = (agencyId) => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_AGENCY_SUBSCRIPTION, agencyId],
    queryFn: async () => {
      const agencySubscription = await getAgencySubscription(agencyId);

      return agencySubscription;
    },
    enabled: !!agencyId,
  });

  return data;
};

export const useGetSubscriptionByAgency = (customerId) => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_SUBSCRIPTION_BY_AGENCY, customerId],
    queryFn: async () => {
      const subscriptions = await getSubscriptionByAgency(customerId);

      return subscriptions;
    },
    enabled: !!customerId,
  });

  return data;
};

export const useGetPricesFromStripe = () => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_PRICE_FROM_STRIPE],
    queryFn: async () => {
      const prices = await stripe.prices.list({
        product: import.meta.env.VITE_STRIPE_PRODUCT_ID,
        active: true,
      });

      return prices;
    },
  });

  return data;
};

export const useGetChargesFromStripe = (agencySubscription) => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_CHARGES_FROM_STRIPE, agencySubscription],
    queryFn: async () => {
      const charges = await stripe.charges.list({
        limit: 10,
        customer: agencySubscription?.customerId,
      });

      return charges;
    },
  });

  return data;
};
export const useGetConnecttAccountStripe = (stripeAccount) => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_CONNECT_ACCOUNT_STRIPE, stripeAccount],
    queryFn: async () => {
      const products = await getConnectAccountProducts(stripeAccount);

      return products;
    },
  });

  return data;
};

export const useGetAuthUserDetail = () => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_AUTH_USER_DETAIL],
    queryFn: async () => {
      const user = await getAuthUserDetail();

      return user;
    },
  });

  return data;
};
export const useGetAllAgency = () => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_AGENCY],
    queryFn: async () => {
      const data = await getAllAgency();

      return data;
    },
  });

  return data;
};

export const useGetAgencyByUser = (agencyId) => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_AGENCY_BY_USER, agencyId],
    queryFn: async () => {
      const agency = await getAgencyByUser({ agencyId });

      return agency;
    },
    enabled: !!agencyId,
  });

  return data;
};
export const useGetAgencyId = (agencyId) => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_AGENCY_BY_ID, agencyId],
    queryFn: async () => {
      const agency = await getAgencyById({ agencyId });

      return agency;
    },
    enabled: !!agencyId,
  });

  return data;
};
export const useGetAgencyBySub = (agencyId) => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_AGENCY_BY_SUB, agencyId],
    queryFn: async () => {
      const agency = await getAgencyBySub({ agencyId });

      return agency;
    },
    enabled: !!agencyId,
  });

  return data;
};
export const useGetSubaccountDetails = (subAccountId) => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_SUBACCOUNT_DETAILS, subAccountId],
    queryFn: async () => {
      const subaccount = await getSubaccountDetails({ subAccountId });

      return subaccount;
    },
    enabled: !!subAccountId,
  });

  return data;
};
export const useGetCollectSubAccount = (agencyId) => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_COLLECT_SUBACCOUNT, agencyId],
    queryFn: async () => {
      const subaccount = await getCollectSubAccount({ agencyId });

      return subaccount;
    },
    enabled: !!agencyId,
  });

  return data;
};

export const useGetFunnels = (subAccountId) => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_FUNNELS, subAccountId],
    queryFn: async () => {
      const funnels = await getFunnels({ subAccountId });

      return funnels;
    },
    enabled: !!subAccountId,
  });

  return data;
};

export const useGetFunnel = (funnelId) => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_FUNNEL, funnelId],
    queryFn: async () => {
      const funnel = await getFunnel(funnelId);

      return funnel;
    },
    enabled: !!funnelId,
  });

  return data;
};

export const useGetFunnelPage = (funnelPageId) => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_FUNNEL_PAGE, funnelPageId],
    queryFn: async () => {
      const funnelPage = await getFunnelPage(funnelPageId);

      return funnelPage;
    },
    enabled: !!funnelPageId,
  });

  return data;
};

export const useGetMedia = (subaccountId) => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_MEDIA, subaccountId],
    queryFn: async () => {
      const media = await getMedia({ subaccountId });

      return media;
    },
    enabled: !!subaccountId,
  });

  return data;
};
export const useGetDomainContent = (subDomainName) => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_DOMAIN_CONTENT, subDomainName],
    queryFn: async () => {
      const domainContent = await getDomainContent({ subDomainName });

      return domainContent;
    },
    enabled: !!subDomainName,
  });

  return data;
};

export const useGetPipelinesFirst = (subAccountId) => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_PIPELINES_FIRST, subAccountId],
    queryFn: async () => {
      const pipelines = await getPipelinesFirst({ subAccountId });

      return pipelines;
    },
    enabled: !!subAccountId,
  });

  return data;
};

export const useGetAllPipelines = (subAccountId) => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PIPELINES, subAccountId],
    queryFn: async () => {
      const pipelines = await getAllPipelines(subAccountId);

      return pipelines;
    },
    enabled: !!subAccountId,
  });

  return data;
};
export const useGetLanesWithTickAndTags = (pipelineId) => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_LANES_WITH_TICKET_ANDTAG, pipelineId],
    queryFn: async () => {
      const lanes = await getLandTicketAndTags({ pipelineId });

      return lanes;
    },
    enabled: !!pipelineId,
  });

  return data;
};

export const useGetSubaccountWithContact = (subAccountId) => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_SUBACCOUNT_WITH_CONTACT, subAccountId],
    queryFn: async () => {
      const subaccount = await getSubAccountWithContact(subAccountId);

      return subaccount;
    },
    enabled: !!subAccountId,
  });

  return data;
};

export const useGetPipelinesDetails = (pipelineId) => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_PIPELINES_DETAILS, pipelineId],
    queryFn: async () => {
      const pipelines = await getPipelinesDetails({ pipelineId });

      return pipelines;
    },
    enabled: !!pipelineId,
  });

  return data;
};

export const useGetTeamMembersByAgency = (agencyId) => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_TEAM_MEMBERS_BY_AGENCY, agencyId],
    queryFn: async () => {
      const team = await getTeamMembersByAgency({ agencyId });

      return team;
    },
    enabled: !!agencyId,
  });

  return data;
};

export const useGetNotificationsAndUser = (agencyId) => {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_NOTIFICATIONS_AND_USER, agencyId],
    queryFn: async () => {
      const notifications = await getNotificationAndUser({ agencyId });

      return notifications;
    },
    enabled: !!agencyId,
  });

  return data;
};

export const useGetAllProfile = (userId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_PROFILE, userId],
    queryFn: () => getAllProfile({ userId }),
    enabled: !!userId,
  });
};
