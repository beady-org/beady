# Part of Beady. See LICENSE file for full copyright and licensing details.

import beady.tests


@beady.tests.common.tagged('post_install', '-at_install')
class TestSnippetBackgroundVideo(beady.tests.HttpCase):

    def test_snippet_background_video(self):
        self.start_tour("/", "snippet_background_video", login="admin")
