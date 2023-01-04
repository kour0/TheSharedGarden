def plots_to_json(plots):
    return [plot_to_json(plot) for plot in plots]

def plot_to_json(plot):
    return {
        'plot_id': plot.plot_id,
        'garden_id': plot.garden_id,
        'plot_name': plot.plot_name,
        'units': plot.units,
        'cultivated_vegetable': plot.cultivated_vegetable,
    }