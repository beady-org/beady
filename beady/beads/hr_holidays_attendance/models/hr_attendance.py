# -*- coding: utf-8 -*-
# Part of Beady. See LICENSE file for full copyright and licensing details.

from beady import models
from beady.aim.expression import AND


class HrAttendance(models.Model):
    _inherit = "hr.attendance"

    def _get_overtime_leave_domain(self):
        domain = super()._get_overtime_leave_domain()
        # resource_id = False => Public holidays
        return AND([domain, ['|', ('holiday_id.holiday_status_id.time_type', '=', 'leave'), ('resource_id', '=', False)]])
