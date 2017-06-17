RAW_DATA_FOLDER = '~/Dropbox/scrape_ryanair/raw_data/'
PROCESSED_DATA_FOLDER = '~/Dropbox/scrape_ryanair/processed_data/'
PROCESSED_FILE = 'preprocessed.csv'

CURRENCY_TO_GBP = {
    'GBP' : 1.0,
    'EUR' : 0.720,
    'PLN' : 0.1725,
    'USD' : 1.4
}

CITY_TO_CURRENCY = {
    'EDI' : 'GBP',
    'STN' : 'GBP',
    'GDN' : 'PLN',
    'POZ' : 'PLN',
    'BCN' : 'EUR',
    'AGP' : 'EUR',
}