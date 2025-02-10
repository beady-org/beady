# -*- coding: utf-8 -*-
# Part of Beady. See LICENSE file for full copyright and licensing details.
from beady.beads.hr_work_entry_contract.tests.common import TestWorkEntryBase
from beady.beads.hr_holidays_contract.tests.common import TestHolidayContract

class TestWorkEntryHolidaysBase(TestWorkEntryBase, TestHolidayContract):

    @classmethod
    def setUpClass(cls):
        super(TestWorkEntryHolidaysBase, cls).setUpClass()
        cls.leave_type.work_entry_type_id = cls.work_entry_type_leave.id
