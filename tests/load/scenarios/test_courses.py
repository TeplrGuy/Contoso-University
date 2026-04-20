from locust import task

try:
    from .base import ContosoUniversityUser
except ImportError:
    from base import ContosoUniversityUser


class CoursesPageUser(ContosoUniversityUser):
    weight = 2

    @task
    def load_courses_page(self):
        with self.client.get("/courses", name="GET /courses", catch_response=True) as response:
            self.assert_ok(response, "GET /courses")
