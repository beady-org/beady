# -*- coding: utf-8 -*-
# Part of Beady. See LICENSE file for full copyright and licensing details.

from beady import fields, models


class Website(models.Model):
    _inherit = 'website'

    karma_profile_min = fields.Integer(string="Minimal karma to see other user's profile", default=150)
