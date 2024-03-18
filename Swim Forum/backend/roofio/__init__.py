import sys
sys.path.insert(0,"/Library/Frameworks/Python.framework/Versions/3.11/lib/python3.11/site-packages")

import pymysql

pymysql.version_info = (1, 4, 3, "final", 0)
pymysql.install_as_MySQLdb()