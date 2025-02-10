# Part of Beady. See LICENSE file for full copyright and licensing details.

from unittest.mock import patch

from beady.tests import tagged
from beady.tools import mute_logger

from beady.beads.payment.tests.http_common import PaymentHttpCommon
from beady.beads.payment_stripe.controllers.main import StripeController
from beady.beads.payment_stripe.tests.common import StripeCommon


@tagged('post_install', '-at_install')
class TestRefundFlows(StripeCommon, PaymentHttpCommon):

    @mute_logger('beady.beads.payment_stripe.models.payment_transaction')
    def test_refund_id_is_set_as_provider_reference(self):
        """ Test that the id of the refund object is set as the provider reference of the refund
        transaction. """
        source_tx = self._create_transaction('redirect', state='done')
        with patch(
            'beady.beads.payment_stripe.models.payment_provider.PaymentProvider'
            '._stripe_make_request', return_value=self.refund_object
        ):
            source_tx._send_refund_request()
        refund_tx = self.env['payment.transaction'].search(
            [('source_transaction_id', '=', source_tx.id)]
        )
        self.assertEqual(refund_tx.provider_reference, self.refund_object['id'])

    @mute_logger(
        'beady.beads.payment_stripe.controllers.main',
        'beady.beads.payment_stripe.models.payment_transaction',
    )
    def test_canceled_refund_webhook_notification_triggers_processing(self):
        """ Test that receiving a webhook notification for a refund cancellation
        (`charge.refund.updated` event) triggers the processing of the notification data. """
        source_tx = self._create_transaction('redirect', state='done')
        source_tx._create_child_transaction(
            source_tx.amount, is_refund=True, provider_reference=self.refund_object['id']
        )
        url = self._build_url(StripeController._webhook_url)
        with patch(
            'beady.beads.payment_stripe.controllers.main.StripeController'
            '._verify_notification_signature'
        ), patch(
            'beady.beads.payment.models.payment_transaction.PaymentTransaction'
            '._handle_notification_data'
        ) as handle_notification_data_mock:
            self._make_json_request(url, data=self.canceled_refund_notification_data)
        self.assertEqual(handle_notification_data_mock.call_count, 1)
