import time
import datetime
import gspread
import sys
from oauth2client.service_account import ServiceAccountCredentials
import threading
import smtplib
from requests.exceptions import *
from gspread import RequestError
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

while True:
    sending_email = raw_input("Enter in the email you would like to set up a Water reminder for: ")
    try:
        email("testing for water reminder", "WHERE'S MY WATER!!!!!", email_send = sending_email)
        break
    except Exception:
        print 'Enter a valid email address'

def decode(s):
    temp = ''
    temp2 = ''
    for x in range(len(s)):
        if x < len(s)/2:
            temp += s[x]
        else:
            temp2 += s[x]
    temp3 = ''
    for x in range(len(s)):
        if x % 2 == 0:
            temp3 += temp[int(x/2)]
        else:
            temp3 += temp2[int(x/2)]
    temp4 = ''
    for x in range(len(temp3)):
        temp4 += chr(ord(temp3[len(temp3)-1-x])-5)
    return temp4

def email(message,subject="",files=['none'],email_user = 'pythonemailsender1@gmail.com',email_password_encoded = '<sm~7tyu',email_send = 'rishavb123@gmail.com'):

    msg = MIMEMultipart()
    msg['From'] = email_user
    msg['To'] = email_send
    msg['Subject'] = subject

    body = message
    msg.attach(MIMEText(body,'plain'))

    for filename in files:
        if filename is not 'none':
            attachment = open(filename,'rb')

            part = MIMEBase('application','octet-stream')
            part.set_payload(attachment.read())
            encoders.encode_base64(part)
            part.add_header('Content-Disposition','attachment; filename= '+filename)

            msg.attach(part)

    text = msg.as_string()
    server = smtplib.SMTP('smtp.gmail.com',587)
    server.starttls()
    server.login(email_user,decode(email_password_encoded))

    server.sendmail(email_user,email_send,text)
    server.quit()

    print 'sent message --> '+str(datetime.datetime.now())+'\n---------------------------------------------------------------------\n'+message+'\n\n\n'


scope = ['https://spreadsheets.google.com/feeds']
creds = ServiceAccountCredentials.from_json_keyfile_name('client_secret.json', scope)
client = gspread.authorize(creds)


def get_info():
    sheet = client.open('Water Reminder Custom Remind (Responses)').sheet1
    arr = []
    minutes = sheet.col_values(2)
    messages = sheet.col_values(3)
    sure = sheet.col_values(4)
    authorization = sheet.col_values(6)

    for x in range(len(sure)):

        if sure[x] == 'Yes':
            if authorization[x] == '5':
                arr.append(x)
                sheet.update_cell(x + 1, 4, 'Done')
            else:
                sheet.update_cell(x + 1, 4, 'Invalid Verification')

    returning = []

    for x in arr:
        msg = messages[x]
        if msg == '':
            msg = 'GO DRINK SOME WATER!!!!!'
        try:
            returning.append([int(minutes[x]), msg])
        except ValueError:
            returning.append([0, 'kill'])

    return returning


class onceEveryThreeHours(threading.Thread):

    def run(self):
        while True:
            tim = str(datetime.datetime.now().time()).split(':')
            hour = int(tim[0])
            minute = int(tim[1])
            if 5 < hour < 22 and (hour+1) % 3 == 0 and minute < 10:
                email("GO DRINK SOME WATER!!!!!\n\nhttps://goo.gl/forms/WZooXwjj69hQJcpG2\nTo set another reminder", "WHERE'S MY WATER", ['image.jpg'], email_send=sending_email)
                time.sleep(3600)

class form(threading.Thread):
    def run(self):
        while True:
            try:
                try:
                    info = get_info()
                    if len(info) == 1:
                        time.sleep(info[0][0]*60)
                        if info[0][1] == 'kill':
                            email("Invalid Form Entry", "WHERE'S MY WATER", ['image.jpg'], email_send=sending_email)
                        else:
                            email(info[0][1]+'\n\nhttps://goo.gl/forms/WZooXwjj69hQJcpG2\nTo set another reminder', "WHERE'S MY WATER", ['image.jpg'], email_send=sending_email)
                    elif len(info) != 0:
                        for x in range(len(info)):
                            minimum = sys.maxint
                            index = -1
                            for y in range(x, len(info)):
                                if get_info()[y][0] < minimum:
                                    minimum = get_info()[y][0]
                                    index = y
                            temp = info[x]
                            info[x] = info[index]
                            info[index] = temp

                        time.sleep(info[0][0]*60)
                        if info[0][1] == 'kill':
                            email("Invalid Form Entry", "WHERE'S MY WATER", ['image.jpg'], email_send=sending_email)
                        else:
                            email(info[0][1]+'\n\nhttps://goo.gl/forms/WZooXwjj69hQJcpG2\nTo set another reminder', "WHERE'S MY WATER", ['image.jpg'], email_send=sending_email)
                        for x in range(1,len(info)):

                            time.sleep(info[x][0]-info[x-1][0])
                            if info[x][1] == 'kill':
                                email("Invalid Form Entry", "WHERE'S MY WATER", ['image.jpg'], email_send=sending_email)
                            else:
                                email(info[x][1]+'\n\nhttps://goo.gl/forms/WZooXwjj69hQJcpG2\nTo set another reminder', "WHERE'S MY WATER", ['image.jpg'], email_send=sending_email)
                except RequestError:
                    client.login()
            except (smtplib.SMTPAuthenticationError, ConnectionError, RequestException, HTTPError, ProxyError, SSLError, Timeout, ConnectTimeout, ReadTimeout, URLRequired, TooManyRedirects, MissingSchema, InvalidHeader, InvalidSchema, InvalidURL, ChunkedEncodingError, ContentDecodingError, StreamConsumedError, RetryError, UnrewindableBodyError):
                pass


one = onceEveryThreeHours()
two = form()
one.start()
two.start()
