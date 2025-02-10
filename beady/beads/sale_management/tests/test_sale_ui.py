# Part of Beady. See LICENSE file for full copyright and licensing details.

from beady.beads.account.tests.common import AccountTestInvoicingCommon
from beady.tests.common import tagged, HttpCase


@tagged('post_install', '-at_install')
class TestUi(AccountTestInvoicingCommon, HttpCase):

    def test_01_sale_tour(self):
        self.env['res.partner'].create({'name': 'Agrolait', 'email': 'agro@lait.be'})
        self.start_tour("/beady", 'sale_tour', login="admin")
