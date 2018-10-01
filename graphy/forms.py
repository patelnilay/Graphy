from django import forms

class ProviderName(forms.Form):
    provider_name = forms.CharField()
    second_provider_name = forms.CharField()
