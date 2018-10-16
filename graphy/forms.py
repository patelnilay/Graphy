from django import forms

YEAR_CHOICES= [
    ('Completions_2014', '2014'),
    ('Completions_2015', '2015'),
    ]

class ProviderName(forms.Form):
    provider_name = forms.CharField()
    second_provider_name = forms.CharField()
    #Completion year
    first_completion_year = forms.CharField(label='What completion year?', widget=forms.Select(choices=YEAR_CHOICES))
    second_completion_year = forms.CharField(label='What completion year?', widget=forms.Select(choices=YEAR_CHOICES))

# class CompletionYear(forms.Form):
