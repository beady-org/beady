from beady.tests.common import users
from beady.exceptions import AccessError
from beady.beads.project.tests.test_access_rights import TestAccessRights

class TestAccessRightsTodo(TestAccessRights):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.private_task = cls.env['project.task'].create({'name': 'BeadyBot Private Task'})

    @users('Internal user')
    def test_internal_cannot_rud_private_task(self):
        with self.assertRaises(AccessError):
            self.private_task.with_user(self.env.user).write({'name': 'Test write'})

        with self.assertRaises(AccessError):
            self.private_task.with_user(self.env.user).unlink()

        with self.assertRaises(AccessError):
            self.private_task.with_user(self.env.user).read(['name'])
