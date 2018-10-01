import csv
from django.shortcuts import render
from django.http import HttpResponse
from graphy.forms import ProviderName


# Create your views here.



def read_csv():
    data = []
    datafile = open('PR0102.csv', 'r')
    datareader = csv.reader(datafile)

    for row in datareader:
        data.append(row)

    datafile.close()
    return data

data = read_csv()

def index(request):
    form = ProviderName()
    selected_data = []
    second_data = []

    if request.method == 'POST':
        selected_provider_name = request.POST.get('provider_name')
        second_provider_name = request.POST.get('second_provider_name')
        # if selected_provider_name == None:
        #     return HttpResponse_404

        print(selected_provider_name)
        print(second_provider_name)


        for colIndex in range(len(data)):
            if data[colIndex][1] == selected_provider_name:
                selected_data.append(data[colIndex])
            elif data[colIndex][0] == second_provider_name:
                second_data.append(data[colIndex])
            elif data[colIndex][1] == second_provider_name:
                second_data.append(data[colIndex])


                #print(colIndex)
    return render(request, 'index.html', {'data': selected_data, 'second_data': second_data, 'form': form})
