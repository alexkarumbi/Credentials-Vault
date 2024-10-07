from setuptools import setup

setup(
    name='Credentials Vault',
    long_description=open('README.md').read(),
    long_description_content_type='text/markdown',
    install_requires=[
        'pyperclip',
        'pycryptodome',
    ],
)
