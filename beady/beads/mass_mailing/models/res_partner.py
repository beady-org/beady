# -*- coding: utf-8 -*-
# Part of Beady. See LICENSE file for full copyright and licensing details.

from beady import models


class Partner(models.Model):
    _inherit = 'res.partner'
    _mailing_enabled = True
