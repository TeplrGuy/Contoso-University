from locust import task

try:
    from .base import ContosoUniversityUser
except ImportError:
    from base import ContosoUniversityUser


class HomePageUser(ContosoUniversityUser):
    weight = 2

    @task
    def load_home_page(self):
        with self.client.get("/", name="GET /", catch_response=True) as response:
            self.assert_ok(response, "GET /")
