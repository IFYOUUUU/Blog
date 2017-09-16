# CentOS7.0基础环境搭建步骤  

## 1、CentOS7.0的安装  
* 通过VMware Workstation来虚拟机  
* 具体安装参照百度教程  
* 注意的时根据自己的习惯选择是否安装界面，以及在软件选择勾选开发工具  
* 自己配置root密码和创建用户，密码过于简单时需要点击两次确认后保存  
* 安装成功后第一次开机需要完成许可验证以及需要设置一下，依次为“1、2、c、c enter”进入系统  

## 2、查看gcc（GNU编辑器套件）是否安装  
通过以下命令测试操作系统是否包含gcc，并且保证版本在4.2以上  
```
gcc -v
```  
如果没有安装gcc，可以通过以下命令进行安装,一般情况我们需要切换到root用户  
```
//安装gcc
yum install gcc
//安装g++
yum install gcc-g++
```  
这样就能完成gcc的安装  

## 3、修改防火墙的配置  
1、停止防火墙（当前环境下防火墙停止，但重启之后会自动开启）  
```
systemctl stop firewalld.service
```  
2、禁用防火墙（直接禁用，重启后生效）  
```
systemctl disable firewalld.service
```  
3、查看防火墙状态（关闭后显示not running,开启显示running）  
```
firewall-cmd --state
```  

## 4、配置网络  
CentOS7.0默认是没有进行网络配置，我们需要自行进行配置  
* 首先我们查看网络的`name`  
```
ifconfig  
//eno16777736....
```  
* 然后切换root用户，切换到对应目录下面  
```
cd /etc/sysconfig/network-scripts/
```  
* 通过vi命令来修改对应文件  
```
vi ifcfg-eno16777736
```  
* 通过`i`命令切换到编辑模式，添加以下内容  
```
//将ONBOOT修改成yes
ONBOOT=yes
//添加下面配置文件
IPADDR0=192.168.xxx.xxx  //具体ip地址
PREFIX0=24
GATWAY0=192.168.xxx.xxx  //网关 broadcast
DNS1=8.8.8.8
DNS2=8.8.4.4
IPV6_PEERDNS=yes
IPV6_PEERROUTES=yes
```  
* 按下`esc`退出编辑模式，输入`:wq`保存退出，重启网络服务  
```
service network restart
```  
* 测试网络是否配置好，ping（www.baidu.com）  
```
ping www.baidu.com
```   
## 5、新建文件夹，拷贝安装包  
1、新建文件夹/home/gauth/soft/,并修改权限（root用户下）  
```
sudo mkdir -p /hoome/gauth/soft/

chmod -R 777 /home/gauth/soft/
```  
2、使用Xftp将安装包拷入该文件夹（`/home/gauth/soft`）下  
3、创建文件夹，并确保当前用户有访问权限（大多时候此文件夹已存在，此步骤可忽略）  
```
sudo mkdir /usr/lib/java
```  
## 6、安装`JRE`  
1、解压安装包至`/usr/local/`目录(默认解压到当前文件夹)  
```
cd /usr/local/

tar -zxvf /home/gauth/soft/jre-8u91-linux-x64.tar.gz
```  
2、修改环境变量(profile是用户环境变量)  
```
sudo vi /etc/profile/
```  
3、按下“i”进入编辑模式，添加以下内容  
```
export JAVA_HOME=/usr/local/jre1.8.0_91
export CLASSPATH=.:${JAVA_HOME}/lib:$CLASSPATH
export PATH=${JAVA_HOME}/bin:$PATH
```  
4、按“esc”退出编辑模式，输入“:wq”保存并退出，（source .bashrc命令刷新环境变量，非必须步骤）  
5、使用"java"命令测试是否安装成功  
```
java -version
```  

## 7、安装`tomcat`  
1、解压安装包至/usr/local/目录  
```
cd /usr/local/

tar -zxvf /home/gauth/soft/apache-tomcat-8.5.5.tar.gz
```  
2、修改环境变量  
```
sudo vi /etc/profile/
```  
3、按“i”进入编辑模式，添加以下内容  
```
export TOMCAT_HOME=/usr/local/apache-tomcat-8.5.5
```  
4、按“esc”退出编辑模式，输入":wq"保存并退出，(source .bashrc命令刷新环境变量，非必须步骤)  
> 注意事项：启动tomcat时，有时会提示端口占用，。使用"netstat -aon|grep 8005" 命令来查看端口是否被占用，如果占用则修改tomcat的配置文件  
> "/usr/local/apache-tomcat-8.5.5/conf"目录下的"server.xml"文件  

5、配置证书  
* 5.1新建文件夹cert，并修改权限  
```
sudo mkdir -p /home/gauth/cert/

chmod -R 777 /home/gauth/cert/
```  
* 5.2执行下面命令生成证书库  
```
/usr/local/jre1.8.0_91/bin/keytool -genkey -alias local198_san -keyalg RSA -ext san=ip:192.169.xxx.xxx -validity 3650 -keystore /home/gauth/cert/local198_san.keystore
```  
这段命令有四个参数是我们配置的：  
1、local198_san:为证书库取的别名  
2、192.168.xxx.xxx: 是服务器的ip地址  
3、3650 : 表示证书的有效时间，单位为天，例如此处配置为10年  
4、/home/gauth/cert/local198_san.keystore: 生成的证书库的存放地址  

* 5.3执行上面的命令会出现下面的画面，按照提示依次输入内容。需要注意的是：  
> 密钥库口令一定要记住  
> 名字与姓氏这一栏需要填写的是服务器的ip地址，需要与命令中ip地址保持一致  
> 所有内容填写完后输入 Y 退出  

![local198_san.png]()  
![png]()  
此处一般直接回车保持口令一致  

* 5.4 导出证书  
```
/usr/local/jre1.8.0_91/bin/keytool -export -keystore /home/gauth/cert/local198_san.keystore -alias local198_san -file /home/gauth/cert/local198_san.cer -rfc
```  
这段命令有三个参数是我们配置的：  
1、/home/gauth/cert/local198_san.ketstore : 证书库的所在路径  
2、local198_san : 证书库的别名  
3、/home/gauth/cert/local198_san.cer : 生成的证书的存放位置  

* 5.5 执行上面的命令后出现下列画面，按照提示收入密钥库口令即可  

![导出证书.png]()  
* 5.6 配置证书  
在tomcat的配置文件("/usr/local/apache-tomcat-8.5.5/conf"目录下的"server.xml")  
```
cd /usr/local/apache-tomcat-8.5.5/conf

vi server.xml
```  
* 5.7添加节点：  
```
<Connector port="8089" protocol="org.apache.coyote.httpll.HttpllNioProtocol" maxThreads="150" SSLEnabled="true" scheme="https" secure="true" clientAuth="false" sslProtocol="TLS" keystoreFile="/home/gauth/cert/local198_san.keystore" keystorePass="xxx" keyAlias="local198_san" acceptCount="200" />
```  
主要配置的有三个参数：  
1、keystoreFile: 证书库的所在路径  
2、keyAlias: 证书的别名  
3、keystorePass:证书库的密钥口令（之前所配置的）  

* 5.8 启动tomcat 
```
cd /usr/local/apache-tomcat-8.5.5/bin

./startup.sh
```  
访问tomcat默认网页，查看是否启动成功"http://+ip地址+:8080"   

  
## 8、安装redis  
1、解压安装包至`/usr/local/`目录  
```
cd /usr/local 
tar -zxvf /home/gauth/soft/redis-3.2.8.tar.gz
```  
2、编译  
```
cd /usr/local/redis-3.2.8/src

make
```  
3、创建文件夹(同时创建三个文件夹，分别为“bin”、“conf”、“logs”)  
```
mkdir -p /usr/local/redis/{bin,conf,logs}
```  
4、拷贝路径下的可执行文件，复制到目标目录"bin"下  
```
find .  \( -perm -0001 \) -type f -exec cp -a -R -p {} /usr/local/redis/bin \;
```  
5、拷贝配置文件  
```
cd /usr/local/redis-3.2.8/

cp redis.conf /usr/local/redis/
```  
6、修改文件权限  
```
chmod -R 777 /usr/local/redis/
```  
7、使用Xftp工具将/usr/local/redis/conf/redis.config下载到本地电脑，然后修改redis.config后再次上传到/usr/local/redis/conf/替换原始文件  
* 将bind 127.0.0.1 改成0.0.0.0 （默认在61行）  
* 将daemonize no 改为 daemonize yes （默认在128行）  
* 将pidfile /var/run/redis_6379.pid 改为 pidfile /usr/local/redis/redis.pid  (默认在150行)  
* 将logfile "" 改为 logfile "/usr/local/redis/logs/redis.log"  （默认在163行）  

8、启动redis （需要重启一下机器）  
```
/usr/local/redis/bin/redis-server  /usr/local/redis/conf/redis.conf
```  
* 查看进程是否启动  
```
ps -ef | grep redis
```  
查看是否联通  
```
/usr/local/redis/bin/redis-cli
```  
* 退出链接  
```
quit
```  

## 9、安装PostgreSQl  

### 9.1[在线安装参考网上教程](http://blog.csdn.net/lk10207160511/article/details/50359549)  

### 9.2 离线安装  
1、准备好安装包  
通过Xftp将pgdg96文件夹传输到`/home/gauth/soft`里面去，将整个pgdg96文件夹复制到`/var/cache/yum/x86_64/7`路径下  
2、创建dba组以及postgres用户  
* 创建dba组  
```
groupadd dba
```  
* 创建postgres用户  
```
useradd -g dba postgres
```  
* 设置密码  
```
passwd postgres
```  
* 输入密码 "123456"  

3、安装数据库  
* 安装数据库  
```
yum install /var/cache/yum/x86_64/7/pgdg96/packages/pgdg-centos96-9.6-3.noarch.rpm
```  
* 安装客户端  
```
yum install /var/cache/yum/x86_64/7/pgdg96/packages/postgresql96-libs-9.6.4-1PGDG.rhel.x86_64.rpm
```  
```
yum install /var/cache/yum/x86_64/7/pgdg96/packages/postgresql96-9.6.4-1PGDG.rhel.x86_64.rpm
```  
* 安装服务端  
```
yum install /var/cache/yum/x86_64/7/pgdg96/packages/postgresql96-server-9.6.4-1PGDG.rhel.x86_64.rpm
```  
* 初始化数据库  
```
/usr/pgsql-9.6/bin/postgresql96-setup initdb
```  
* 修改监听端口  
```
vi /var/lib/pgsql/9.6/data/postgresql.conf
```  
按下“i”进入编辑模式  
1、将"#listen addresses='localhost'"  改为 "listen addresses='*'"  
2、将"#port=5432"  改为 "port=5432" (默认63行)  

* 修改允许访问ip配置  
```
vi /var/lib/pgsql/9.6/data/pg_hba.conf
```  
按下"i"进入编辑模式，添加以下内容：  
```
host all all 0.0.0.0 0.0.0.0 trust
```  

* 启动pg服务  
```
systemctl enable postgresql-9.6

systemctl start postgresql-9.6
```  
单独启动数据库服务  
```
/usr/pgsql-9.6/bin/pg_ctl start -D /var/lib/pgsql/9.6/data
```  
停止服务，使用以下命令  
```
systemctl stop postgresql-9.6
```  
单独停止数据库服务  
```
/usr/pgsql-9.6/bin/pg_ctl stop -D /var/lib/pgsql/9.6/data
```  
