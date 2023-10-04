#!/usr/bin/env python3
"""Mock logging in"""
from flask import Flask, render_template, request, g
from flask_babel import Babel


app = Flask(__name__)
babel = Babel(app)


class Config:
    """Babel configuration"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)


@app.before_request
def before_request():
    """Before request"""
    g.user = get_user()


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user():
    """ Returns a user dictionary or None if the ID cant be found"""
    try:
        return users.get(int(request.args.get('login_as')))
    except Exception:
        return None


@app.route('/', methods=['GET'], strict_slashes=False)
def index():
    """GET /
    Return:
      1-index.html
    """
    return render_template('5-index.html')


@babel.localeselector
def get_locale():
    requested_locale = request.args.get('locale')
    if requested_locale in app.config['LANGUAGES']:
        return requested_locale
    """Determine best match for supported languages
    Return:
      Best language
    """
    return request.accept_languages.best_match(app.config['LANGUAGES'])


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, threaded=True, debug=True)
