from locust import task

try:
    from .base import ContosoUniversityUser
except ImportError:
    from base import ContosoUniversityUser


class AssistantPageUser(ContosoUniversityUser):
    weight = 1

    @task
    def load_assistant_page(self):
        with self.client.get("/assistant", name="GET /assistant", catch_response=True) as response:
            self.assert_ok(response, "GET /assistant")
