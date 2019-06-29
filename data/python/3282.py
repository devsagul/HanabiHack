#!/usr/bin/env python


import paramiko
import time
from getpass import getpass

pynet_rtr2 = {
    'device':'Cisco 881',
    'ip_addr':'184.105.247.71',
    'username':'pyclass',
    'password':'',
    'snmp_port':161,
    'ssh_port':22,
}

pynet_rtr2['password'] = getpass()

remote_conn_pre = paramiko.SSHClient()
remote_conn_pre.set_missing_host_key_policy(paramiko.AutoAddPolicy())
remote_conn_pre.connect(pynet_rtr2['ip_addr'], username=pynet_rtr2['username'], password=pynet_rtr2['password'], look_for_keys=False, allow_agent=False, port=pynet_rtr2['ssh_port'])

remote_conn = remote_conn_pre.invoke_shell()

remote_conn.send("terminal length 0\n")
remote_conn.send("show version\n")
time.sleep(1)
output = remote_conn.recv(5000)
print output

