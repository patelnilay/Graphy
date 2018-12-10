from django import forms

YEAR_CHOICES = [
    ('2014', '2014'),
    ('2015', '2015'),
]

class QueryForm(forms.Form):
    first_provider = forms.CharField()
    second_provider = forms.CharField()
    lower_year_bound = forms.CharField(label='First Comparison', widget=forms.Select(choices=YEAR_CHOICES))
    upper_year_bound = forms.CharField(label='Second Comparison', widget=forms.Select(choices=YEAR_CHOICES))
