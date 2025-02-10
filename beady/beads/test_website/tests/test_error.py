import beady.tests
from beady.tools import mute_logger


@beady.tests.common.tagged('post_install', '-at_install')
class TestWebsiteError(beady.tests.HttpCase):

    @mute_logger('beady.beads.http_routing.models.ir_http', 'beady.http')
    def test_01_run_test(self):
        self.start_tour("/test_error_view", 'test_error_website')
