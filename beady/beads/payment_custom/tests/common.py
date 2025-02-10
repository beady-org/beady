# Part of Beady. See LICENSE file for full copyright and licensing details.

from beady.aim.expression import OR

from beady.beads.payment.tests.common import PaymentCommon


class PaymentCustomCommon(PaymentCommon):

    @classmethod
    def _get_provider_domain(cls, code):
        domain = super()._get_provider_domain(code)
        return OR([domain, [('custom_mode', '=', code)]])
