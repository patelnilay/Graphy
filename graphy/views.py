import csv
from django.shortcuts import render
from django.http import HttpResponse, Http404
from graphy.forms import QueryForm
import json
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
csv_data = read_csv()


def get_provider_name_from_id(id):
    print("aaaa")
    for row in csv_data:
        if row[0] == str(id):
            print("WE FOUND:")
            print(row[1])
            return row[1]

# form request
def index(request):
    form = QueryForm()

    if request.method == "POST":
        queried_data = {}

        first_provider = request.POST.get("first_provider")
        second_provider = request.POST.get("second_provider")
        lower_year_bound = request.POST.get("lower_year_bound")
        upper_year_bound = request.POST.get("upper_year_bound")



        if first_provider.isdigit():
            first_provider = get_provider_name_from_id(first_provider)

        if second_provider.isdigit():
            second_provider = get_provider_name_from_id(second_provider)

        queried_data[first_provider] = {}
        queried_data[second_provider] = {}

        for row in csv_data:
            if row[1] in [first_provider, second_provider]:
                if row[3] == "All":
                    if lower_year_bound == "2014":
                        if row[1] == first_provider:
                            queried_data[first_provider]["2014"] = row[5]
                            queried_data[first_provider]["2014"] = row[5]
                        elif row[1] == second_provider:
                            queried_data[second_provider]["2014"] = row[5]
                            queried_data[second_provider]["2014"] = row[5]

                    if upper_year_bound == "2015":
                        if row[1] == first_provider:
                            queried_data[first_provider]["2015"] = row[6]
                            queried_data[first_provider]["2015"] = row[6]
                        elif row[1] == second_provider:
                            queried_data[second_provider]["2015"] = row[6]
                            queried_data[second_provider]["2015"] = row[6]

        return render(request, 'index.html', {'form': form, 'queried_data': json.dumps(queried_data)})


    return render(request, 'index.html', {'form': form})
