import zope.interface, logging, time
from datetime import datetime
from sqlalchemy import Column, Integer, text
from sqlalchemy.exc import SQLAlchemyError

from Houdini.Plugins import Plugin
from Houdini.Handlers import Handlers
from Houdini.Data.Penguin import Penguin

class Rank(object):
    zope.interface.implements(Plugin)

    author = "Houdini Team"
    version = 0.1
    description = "Adjusts the chevron(s) on membership badges to represent the user's rank."

    membershipDaysByRank = [180, 360, 540, 720, 750]

    def __init__(self, server):
        self.logger = logging.getLogger("Houdini")

        self.server = server

        Penguin.Rank = Column(Integer, nullable=False, server_default=text("'1'"))
        try:
            self.server.databaseEngine.execute("ALTER TABLE penguin add Rank TINYINT(1) DEFAULT 1;")

        except SQLAlchemyError as exception:
            if "Duplicate column name" not in exception.message:
                self.logger.warn(exception.message)

        Handlers.Login += self.adjustMembershipDays
        Handlers.JoinWorld += self.handleJoinWorld

    def adjustMembershipDays(self, player, data):
        playerRank = player.session.query(Penguin.Rank). \
            filter(Penguin.ID == player.user.ID).scalar() - 1

        if playerRank >= 5:
            playerRank = 4

        player.age = Rank.membershipDaysByRank[playerRank]

    def handleJoinWorld(self, player, data):
        currentTime = int(time.time())
        penguinStandardTime = currentTime * 1000
        serverTimeOffset = 7
        currentDateTime = datetime.now()

        age = (currentDateTime - player.user.RegistrationDate).days
        player.sendXt("lp", player.getPlayerString(), player.user.Coins, 0, 1440,
                    penguinStandardTime, age, 0, player.user.MinutesPlayed, None, serverTimeOffset)

    def ready(self):
        self.logger.info("Rank plugin is ready!")