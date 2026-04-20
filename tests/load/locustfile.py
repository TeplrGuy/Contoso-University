"""Contoso University load-test entrypoint.

Imports are intentionally used for Locust class discovery.
"""

from scenarios import (  # noqa: F401
    AssistantPageUser,
    CoursesPageUser,
    DepartmentsPageUser,
    HomePageUser,
    StudentsPageUser,
    TeachersPageUser,
)
