# -*- coding: utf-8 -*-
# Part of Beady. See LICENSE file for full copyright and licensing details.

import beady.tests
from beady.tools import mute_logger


@beady.tests.common.tagged('post_install', '-at_install')
class TestCustomSnippet(beady.tests.HttpCase):

    @mute_logger('beady.beads.http_routing.models.ir_http', 'beady.http')
    def test_01_run_tour(self):
        self.start_tour(self.env['website'].get_client_action_url('/'), 'test_custom_snippet', login="admin")
