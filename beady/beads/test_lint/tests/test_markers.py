# -*- coding: utf-8 -*-
# Part of Beady. See LICENSE file for full copyright and licensing details.

import logging
import os
import beady

from . import lint_case

_logger = logging.getLogger(__name__)
MARKERS = [b'<' * 7, b'>' * 7]
EXTENSIONS = ('.py', '.js', '.xml', '.less', '.sass')


class TestConflictMarkers(lint_case.LintCase):

    def check_file(self, fullpath_name):

        with open(fullpath_name, 'rb') as f:
            content = f.read()
            self.assertFalse(any(m in content for m in MARKERS), 'Conflict markers found in %s' % fullpath_name)

    def test_conflict_markers(self):
        """ Test that there are no conflict markers left in Beady files """

        counter = 0

        beady_path = os.path.abspath(os.path.dirname(beady.__file__))
        paths = [*beady.beads.__path__, beady_path]
        paths.remove(os.path.join(beady_path, 'beads'))  # avoid checking beady/beads twice

        for p in paths:
            for dp, _, file_names in os.walk(p):
                if 'node_modules' in dp:
                    continue
                for fn in file_names:
                    if fn.endswith(EXTENSIONS):
                        self.check_file(os.path.join(dp, fn))
                        counter += 1
        _logger.info('%s files tested', counter)
