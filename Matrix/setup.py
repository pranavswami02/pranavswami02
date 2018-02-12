from cx_Freeze import setup, Executable

setup(name='Runner', version='0.1', description='Water Reminder Email Runner', executables=[Executable('Main.py')])
