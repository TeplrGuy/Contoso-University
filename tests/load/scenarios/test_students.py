from locust import task

try:
    from .base import ContosoUniversityUser
except ImportError:
    from base import ContosoUniversityUser


class StudentsPageUser(ContosoUniversityUser):
    weight = 2

    @task
    def load_students_page(self):
        with self.client.get("/students", name="GET /students", catch_response=True) as response:
            self.assert_ok(response, "GET /students")
