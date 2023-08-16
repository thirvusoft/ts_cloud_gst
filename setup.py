from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in ts_cloud_gst/__init__.py
from ts_cloud_gst import __version__ as version

setup(
	name="ts_cloud_gst",
	version=version,
	description="ERP Custom App",
	author="Thirvusoft",
	author_email="thirvusoft@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
