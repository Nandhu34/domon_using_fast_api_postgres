# Use Python base image
FROM python:3.12.7

# Set working directory
WORKDIR /code

# Install system dependencies required for building packages
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    libffi-dev \
    libssl-dev \
    python3-dev

# Copy requirements file
COPY ./requirements.txt /code/requirements.txt

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy application code
COPY . /code

# Run FastAPI application
CMD ["python", "app.py"]
