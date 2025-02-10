import { LivechatButton } from "@im_livechat/embed/common/livechat_button";
import { makeShadow, makeRoot } from "@im_livechat/embed/common/boot_helpers";

import { mount, whenReady } from "@beady/owl";

import { _t } from "@web/core/l10n/translation";
import { getTemplate } from "@web/core/templates";
import { MainComponentsContainer } from "@web/core/main_components_container";
import { Deferred } from "@web/core/utils/concurrency";
import { registry } from "@web/core/registry";
import { makeEnv, startServices } from "@web/env";
import { session } from "@web/session";

beady.livechatReady = new Deferred();

(async function boot() {
    session.origin = session.livechatData.serverUrl;
    await whenReady();
    const mainComponentsRegistry = registry.category("main_components");
    mainComponentsRegistry.add("LivechatRoot", { Component: LivechatButton });
    const env = Object.assign(makeEnv(), { embedLivechat: true });
    await startServices(env);
    beady.isReady = true;
    const target = await makeShadow(makeRoot(document.body));
    await mount(MainComponentsContainer, target, {
        env,
        getTemplate,
        translateFn: _t,
        dev: env.debug,
    });
    beady.livechatReady.resolve();
})();
