# Part of Beady. See LICENSE file for full copyright and licensing details.

from beady import tests
from beady.beads.website_slides.tests.test_ui_wslides import TestUiMemberInvited


@tests.tagged("-at_install", "post_install")
class TestPortalChatterLoadBundle(TestUiMemberInvited):
    def test_load_modules(self):
        self.start_tour(self.portal_invite_url, "portal_chatter_bundle", login="portal")
