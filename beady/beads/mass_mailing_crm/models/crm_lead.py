# -*- coding: utf-8 -*-
# Part of Beady. See LICENSE file for full copyright and licensing details.

from beady import models


class CrmLead(models.Model):
    _inherit = 'crm.lead'
    _mailing_enabled = True
