#!/usr/bin/env python
#coding: utf-8

"""
The command line arguments definition.
"""

import argparse

from . import __prog__, __version__

parser = argparse.ArgumentParser(
            prog=__prog__, formatter_class=argparse.RawTextHelpFormatter,
            description="Manage your tasks of a local git repository.")

parser.add_argument(
            "-v", "--version", action="version",
            version="{0} - {1}".format(__prog__,__version__))

# subparsers
subparsers = parser.add_subparsers(title="git-todo commands", dest="cmd")

def _mkcommand(name, help_msg):
    """make parser command and return instance."""
    return subparsers.add_parser(name,help=help_msg+"\n\n")

_init = _mkcommand(
            "init",
            "Initialize for manage tasks.\n"
            "The git-todo create database file "
            "in top level directory of git repository.\n"
            "In default, git-todo automaticaly follow database file by git\n"
            "when create task, close task, reopen task, update task.\n"
            "but if you want to not commit, please set --no-follow option.")

_init.add_argument(
        "--no-follow", action="store_true",
        help="In default, git-todo automaticaly follow database file by git\n"
             "when create task, close task, reopen task, update task.\n"
             "but if you want to not commit, please set this option.")


_add  = _mkcommand("add", "Create your new task.")

_add.add_argument(
            "task", action="store",
            help="Your task string of one line.\n"
                 "When you write space contained string,\n"
                  "please use double quotation.\n")


_list = _mkcommand("ls", "Show your tasks with some filters.\n"
                        "if you not set filter, you can show "
                        "only OPEN status tasks.")

_list.add_argument(
        "-A", "--all", action="store_true", dest="all",
        help="Show your all tasks.")

# Add some argument when decide task attributes.

_branch = _mkcommand(
            "branch",
            "The branch command creates a branch to implement task.\n"
            "The branch name is \"imp_TODO#(number)\" in default,\n"
            "but you can change the branch name to your original.")

_branch.add_argument(
            "task_index", action="store", type=int,
            help="The task index number. allows INT type only.")

_branch.add_argument(
            "-N", "--name", action="store", dest="branch_name",
            help="The branch name string.")


_close = _mkcommand(
            "close",
            "Close your task.\n"
            "The task status changes from OPEN to CLOSED,\n"
            "And this close command put a tag to latest commit.\n"
            "The tag name is \"close_TODO#(number)\" in default.\n"
            "Unlike branch command, you can't change the tag name.")

_close.add_argument(
            "task_index", action="store", type=int,
            help="The task index number. allows INT type only.")


_reopen = _mkcommand(
            "reopen",
            "If you want to return task status from CLOSED to OPEN,\n"
            "this open command reOPEN the task with a new task number.")

_reopen.add_argument(
            "task_index", action="store", type=int,
            help="The task index number. allows INT type only.")


_export = _mkcommand(
            "export",
            "This command can export task data.\n"
            "You can choose export format from JSON or TEXT.\n")

_export.add_argument(
            "file", action="store",
            help="The path of export file")

_export.add_argument(
            "-F", "--format", action="store", choices=["json","text"],
            help="You can choose export format.")

_export.add_argument(
            "-R", "--range", action="store",
            help="You can set task number to export task range."
                 "If you want to export multiple tasks,"
                 "you can set task range like this: \"1-3\", \"1,3,5\"")


_import = _mkcommand(
            "import", "This command can import task data from exported file by JSON format.")

_import.add_argument(
            "file", action="store",
            help="The path of export file")






