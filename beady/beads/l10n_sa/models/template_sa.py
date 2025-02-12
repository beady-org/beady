# Part of Beady. See LICENSE file for full copyright and licensing details.
from beady import Command, models
from beady.beads.account.models.chart_template import template


class AccountChartTemplate(models.AbstractModel):
    _inherit = "account.chart.template"

    @template("sa")
    def _get_sa_template_data(self):
        return {
            "property_account_receivable_id": "sa_coa_1200",
            "property_account_payable_id": "sa_coa_2400",
            "property_account_expense_categ_id": "sa_coa_5000",
            "property_account_income_categ_id": "sa_coa_4000",
            "code_digits": "4",
        }

    @template("sa", "res.company")
    def _get_sa_res_company(self):
        return {
            self.env.company.id: {
                "account_fiscal_country_id": "base.sa",
                "bank_account_code_prefix": "11",
                "cash_account_code_prefix": "10",
                "transfer_account_code_prefix": "13",
                "account_default_pos_receivable_account_id": "sa_coa_1200",
                "income_currency_exchange_account_id": "sa_coa_5304",
                "expense_currency_exchange_account_id": "sa_coa_5304",
                "account_sale_tax_id": "sa_sales_tax_15",
                "account_purchase_tax_id": "sa_purchase_tax_15",
            },
        }

    @template("sa", "account.journal")
    def _get_sa_account_journal(self):
        """If Saudi Arabia chart, we add 3 new journals Tax Adjustments, IFRS 16 and Zakat"""
        return {
            "tax_adjustment": {
                "name": "Tax Adjustments",
                "code": "TA",
                "type": "general",
                "show_on_dashboard": True,
                "sequence": 10,
            },
            "ifrs16": {
                "name": "Fixid Assets",
                "code": "IFRS",
                "type": "general",
                "show_on_dashboard": True,
                "sequence": 10,
            },
            "zakat": {
                "name": "Zakat",
                "code": "ZAKAT",
                "type": "general",
                "show_on_dashboard": True,
                "sequence": 10,
            },
        }

    @template("sa", "account.account")
    def _get_sa_account_account(self):
        return {
            "sa_coa_1701": {"allowed_journal_ids": [Command.link("ifrs16")]},
            "sa_coa_1702": {"allowed_journal_ids": [Command.link("ifrs16")]},
            "sa_coa_1703": {"allowed_journal_ids": [Command.link("ifrs16")]},
            "sa_coa_5501": {"allowed_journal_ids": [Command.link("zakat")]},
        }
