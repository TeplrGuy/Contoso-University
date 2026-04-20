from locust import task

try:
    from .base import ContosoUniversityUser
except ImportError:
    from base import ContosoUniversityUser


class TeachersPageUser(ContosoUniversityUser):
    weight = 2

    @task
    def load_teachers_page(self):
        with self.client.get("/teachers", name="GET /teachers", catch_response=True) as response:
            self.assert_ok(response, "GET /teachers")
