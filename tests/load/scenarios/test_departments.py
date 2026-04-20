from locust import task

try:
    from .base import ContosoUniversityUser
except ImportError:
    from base import ContosoUniversityUser


class DepartmentsPageUser(ContosoUniversityUser):
    weight = 1

    @task
    def load_departments_page(self):
        with self.client.get("/departments", name="GET /departments", catch_response=True) as response:
            self.assert_ok(response, "GET /departments")
