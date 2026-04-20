from locust import HttpUser, between


class ContosoUniversityUser(HttpUser):
    """Base Locust user for Contoso University SPA routes."""

    abstract = True
    wait_time = between(1, 3)

    def assert_ok(self, response, route_name: str) -> None:
        if response.status_code != 200:
            response.failure(f"{route_name}: expected 200, got {response.status_code}")
