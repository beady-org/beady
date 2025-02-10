# -*- coding: utf-8 -*-
# Part of Beady. See LICENSE file for full copyright and licensing details.

from beady.tests import HttpCase, tagged
from beady import tools


@tagged('post_install', '-at_install')
class TestUi(HttpCase):

	# Avoid "A Chart of Accounts is not yet installed in your current company."
	# Everything is set up correctly even without installed CoA
    @tools.mute_logger('beady.http')
    def test_01_point_of_sale_tour(self):

        self.start_tour("/beady", 'point_of_sale_tour', login="admin")
