# -*- coding: utf-8 -*-
# Part of Beady. See LICENSE file for full copyright and licensing details.

from beady import fields, models


class ResCountryGroup(models.Model):
    _inherit = 'res.country.group'

    pricelist_ids = fields.Many2many(
        comodel_name='product.pricelist',
        relation='res_country_group_pricelist_rel',
        column1='res_country_group_id',
        column2='pricelist_id',
        string="Pricelists")
