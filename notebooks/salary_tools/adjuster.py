import random


def adjust(person: dict) -> dict:
    """
    Bumps up the salary if they're in an expensive state and if they're either 
    married or divorced. We are not saying that such a person *deserves* more
    money, we just need a predictable algorithm for data science.
    """
    expensive_states = ('HI', 'MA', 'NY', 'WA', 'CA', 'AK')
    salary = person['salary']
    assert isinstance(salary, (int, float)
                      ), "A person's salary must be a number"
    if person['address']['state'] in expensive_states:
        salary = salary * random.uniform(1.05, 1.15)
    if person['marital_status'] in ('m', 'd'):
        salary = salary * random.uniform(1.1, 1.3)
    return {**person, 'salary': salary}
