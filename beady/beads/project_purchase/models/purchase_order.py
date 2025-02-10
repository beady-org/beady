# Part of Beady. See LICENSE file for full copyright and licensing details.

from beady import fields, models


class PurchaseOrder(models.Model):
    _inherit = 'purchase.order'

    project_id = fields.Many2one('project.project')
