from setuptools import setup

if __name__ == "__main__":

    with open('README.md', 'r') as f:
        long_description = f.read()

    setup(
        classifiers=[
            'Environment :: Local Environment',
            'Intended Audience :: Developers',
            'License :: MIT License',
            'Operating System :: OS Independent',
            'Programming Language :: Python',
            'Programming Language :: Python :: 3.X'
            'Programming Language :: Python :: Implementation :: CPython',
            'Programming Language :: Python :: Implementation :: PyPy',
            'Topic :: Rapid Prototyping :: Code Generator',
            'Topic :: Software Development :: Libraries :: Python Modules'
        ],
        description="markdown + magic",
        long_description=long_description,
        setup_requires=["incremental"],
        use_incremental=True,
        install_requires=[ ],
        keywords="markdown flask werkzeug web",
        license="MIT",
        name="protodown",
        packages=["protodown", "protodown.test"],
        package_dir={"": "src"},
        url="https://github.com/tweakch/protodown",
        maintainer='Alexander Klee (tweakch)',
        maintainer_email='alex.klee@outlook.com',
)
