import csv
from django.shortcuts import render
from django.http import HttpResponse, Http404
from graphy.forms import ProviderName
import re
# from graphy.forms import CompletionYear


# Create your views here.


# read the csv and append it to a list
def read_csv():
    data = []
    datafile = open('PR0102.csv', 'r')
    datareader = csv.reader(datafile)
    # for loop reads data in csv by row and puts it into a list
    for row in datareader:
        data.append(row)

    datafile.close()
    return data

#lsit of csv data
data = read_csv()

# form request
def index(request):
    provider_form = ProviderName()

    selected_data = None
    #checks if the post request is valid, if it is not valid then a request 404 page is displayed.
    if request.method == 'POST':
        selected_provider_name = request.POST.get('provider_name')
        second_provider_name = request.POST.get('second_provider_name')

        selected_data = {selected_provider_name: [], second_provider_name: []}

        # Not yet implemented
        first_completion_year = request.POST.get('first_completion_year')
        second_completion_year = request.POST.get('second_completion_year')


        # if selected_provider_name == None:
        #     return HttpResponseNotFound('<h1>Page not found</h1>')



        for row in data:
            if row[3] == 'All' and row[1] in [selected_provider_name, second_provider_name]:
                selected_data[row[1]].append(row)
            elif row[3] == 'All' and row[0] in [selected_provider_name, second_provider_name]:
                selected_data[row[0]].append(row)

        # for row in data:
        #     if data[5][0] ==



    return render(request, 'index.html', {'selected_data': selected_data,
        'provider_form': provider_form})
