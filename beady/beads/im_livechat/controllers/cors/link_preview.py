# Part of Beady. See LICENSE file for full copyright and licensing details.

from beady.http import route
from beady.beads.mail.controllers.link_preview import LinkPreviewController
from beady.beads.im_livechat.tools.misc import force_guest_env


class LivechatLinkPreviewController(LinkPreviewController):
    @route("/im_livechat/cors/link_preview", methods=["POST"], type="json", auth="public", cors="*")
    def livechat_link_preview(self, guest_token, message_id):
        force_guest_env(guest_token)
        self.mail_link_preview(message_id)

    @route("/im_livechat/cors/link_preview/hide", methods=["POST"], type="json", auth="public", cors="*")
    def livechat_link_preview_hide(self, guest_token, link_preview_ids):
        force_guest_env(guest_token)
        self.mail_link_preview_hide(link_preview_ids)
