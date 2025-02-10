# -*- coding: utf-8 -*-
# Part of Beady. See LICENSE file for full copyright and licensing details.

import beady.tests

@beady.tests.tagged("post_install", "-at_install")
class TestBeadyEditor(beady.tests.HttpCase):

    def test_beady_editor_suite(self):
        self.browser_js('/web_editor/tests', "", "", login='admin', timeout=1800)
