import { getWorkflowActionOptions } from "@calcom/features/commercial/workflows/lib/getOptions";
import { IS_SELF_HOSTED } from "@calcom/lib/constants";
import hasKeyInMetadata from "@calcom/lib/hasKeyInMetadata";
import { getTranslation } from "@calcom/lib/server/i18n";
import type { TrpcSessionUser } from "@calcom/trpc/server/trpc";

import { hasTeamPlanHandler } from "../teams/hasTeamPlan.handler";

type GetWorkflowActionOptionsOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser> & {
      locale: string;
    };
  };
};

export const getWorkflowActionOptionsHandler = async ({ ctx }: GetWorkflowActionOptionsOptions) => {
  const { user } = ctx;

  const isCurrentUsernamePremium = user && user.metadata && hasKeyInMetadata(user, "isPremium");

  let isTeamsPlan = false;
  if (!isCurrentUsernamePremium) {
    const { hasTeamPlan } = await hasTeamPlanHandler({ ctx });
    isTeamsPlan = !!hasTeamPlan;
  }
  const t = await getTranslation(ctx.user.locale, "common");
  return getWorkflowActionOptions(t, IS_SELF_HOSTED || isCurrentUsernamePremium || isTeamsPlan);
};
